import {MaterialInfo,} from '@/types/userAccount';
import {User} from '@clerk/backend';
import {ContractsProvider} from '@/common/contractsProvider';
import {
    CertificateToken,
    ChartDataItem,
    CollectionMaterial,
    CollectorStats,
    DashboardData
} from '@/types/dashboardData';
import {fetchUserAccount} from '@/back/fetchUserAccount';
import {notFound} from '@hapi/boom';
import {
    Account,
    Address, Transaction,
    TransactionPaymentSubtype,
    TransactionType
} from '@signumjs/core';
import {StockContract} from '@veridibloc/smart-contracts';
import {convertHexEndianess, convertHexStringToDecString} from '@signumjs/util';


async function fetchCertificateTokens(certificateContractIds: string[], account: Account): Promise<CertificateToken[]> {
    const provider = new ContractsProvider();
    const contracts = await Promise.all(
        certificateContractIds.map(id => provider.getCertificateTokenContract(id))
    )

    const certificateTokens: CertificateToken[] = [];
    for (let contract of contracts) {
        const {tokenId, tokenName, tokenDecimals} = contract.getData()
        const balance = account.assetBalances.find(a => a.asset === tokenId)
        certificateTokens.push({
            name: tokenName.split('').reverse().join(''),
            decimals: tokenDecimals,
            id: tokenId,
            quantity: balance?.balanceQNT ?? "0"
        })
    }
    return certificateTokens;
}


async function fetchChartData(stockContracts: StockContract[], materials: MaterialInfo[]): Promise<ChartDataItem[]> {
    const result: ChartDataItem[] = [];
    for (let contract of stockContracts) {
        const material = materials.find(m => m.stockContractId === contract.contractId);
        if (!material) continue;
        const {lotUnitQuantity, stockQuantity, nextLotNumber} = contract.getData();
        // newest is always first element
        const lotreceipts = await contract.getLotReceipts();
        const lastSoldLot = lotreceipts.length && lotreceipts[0].lotNumber;
        const lotsInStock = Math.max(0, nextLotNumber - lastSoldLot - 101);
        result.push({
            name: material.type.toUpperCase(),
            unbundled: stockQuantity / 1000,
            lots: lotsInStock * lotUnitQuantity / 1000,
        })
    }

    return result;
}

function parseCollectorContractMessage(tx: Transaction) {

    if(tx.attachment?.message){
        const materialIdHex = tx.attachment.message.substring(0, 16); // 1st
        const quantityHex = tx.attachment.message.substring(16, 32); // 2nd
        const collectorIdHex = tx.attachment.message.substring(32); // 3rd
        const materialId = convertHexStringToDecString(convertHexEndianess(materialIdHex));
        const quantity = Number(convertHexStringToDecString(convertHexEndianess(quantityHex)));
        const collectorId = convertHexStringToDecString(convertHexEndianess(collectorIdHex));
        return {
            materialId,
            quantity,
            collectorId
        }
    }

    return {
        materialId: "0",
        quantity: 0,
        collectorId: "0",
    }
}

async function fetchCollectorStats(provider: ContractsProvider, userAddress: Address): Promise<CollectorStats> {
    const contract = await provider.getCollectorTokenContractSingleton();
    const {tokenId} = contract.getData();

    const [collectorToken, outgoingTransactions, materials] = await Promise.all([
        provider.ledger.asset.getAsset({assetId: tokenId}),
        provider.ledger.account.getAccountTransactions({
            accountId: userAddress.getNumericId(),
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.Ordinary,
            includeIndirect: false
            // TODO: more than 500
        }),
        contract.getAllMaterials()
    ])

    const exchangeRateMap = materials.reduce((acc, material) => {
        acc[material.materialId] = material.rate
        return acc;
    }, {} as Record<string, number>)
    const materialQuantities: Record<string, number > = {};
    const uniqueCollectors = new Set<string>();
    // this value is probably not exact as it relies on the current exchange rate.
    let grantedTokens = 0;
    for(let tx of outgoingTransactions.transactions){
        if(tx.recipient === contract.contractId){
            const {materialId, quantity, collectorId} = parseCollectorContractMessage(tx);

            if(exchangeRateMap[materialId]){
                grantedTokens += quantity/exchangeRateMap[materialId];
            }

            if (materialQuantities[materialId]){
                materialQuantities[materialId] += quantity;
            }
            else {
                materialQuantities[materialId] = quantity;
            }

            if(collectorId !== "0"){
                uniqueCollectors.add(collectorId);}
            }
        }

    const collectedMaterial: CollectionMaterial[] = Object.entries(materialQuantities).map( ([id, quantity]) => {
        return {
            id,
            quantity,
        }
    })

    return {
        tokenMetadata: {
            name: collectorToken.name.toUpperCase(),
            decimals: collectorToken.decimals,
            id: tokenId
        },
        grantedTokens,
        collectorCount: uniqueCollectors.size,
        collectedMaterial,
    }
}

export const fetchDashboardData = async (user: User): Promise<DashboardData> => {
    const userAccount = await fetchUserAccount(user, false);
    if (!userAccount) {
        throw notFound();
    }
    const userAddress = Address.fromPublicKey(userAccount.publicKey);
    const provider = new ContractsProvider();
    const ledgerAccount = await provider.ledger.account.getAccount({accountId: userAddress.getNumericId(),})

    const materials = (user.publicMetadata?.materials as MaterialInfo[]) ?? [];
    const contractIds = materials.map((material) => material.stockContractId);
    const stockContracts = await provider.getManyStockContracts(contractIds);

    const certificateContractIds = new Set<string>();
    for (let contract of stockContracts) {
        const d = contract.getData();
        if (d.certificateContractId) {
            certificateContractIds.add(d.certificateContractId)
        }
    }
    // todo: parallelize
    const certificateTokens = await fetchCertificateTokens(Array.from(certificateContractIds), ledgerAccount);
    const chartData = await fetchChartData(stockContracts, materials);
    const collectorStats = await fetchCollectorStats(provider, userAddress);
    return {
        balance: ledgerAccount.guaranteedBalanceNQT,
        certificateTokens,
        chartData,
        collectorStats
    }
}
