import {MaterialInfo,} from '@/types/userAccount';
import {User} from '@clerk/backend';
import {ContractsProvider} from '@/common/contractsProvider';
import {CertificateToken, DashboardData} from '@/types/dashboardData';
import {fetchUserAccount} from '@/back/fetchUserAccount';
import {notFound} from '@hapi/boom';
import {Account, Address} from '@signumjs/core';


async function fetchCertificateTokens(certificateContractIds: string[], account: Account): Promise<CertificateToken[]> {
    const provider = new ContractsProvider();
    const contracts = await Promise.all(
    certificateContractIds.map( id => provider.getCertificateTokenContract(id))
    )

    const certificateTokens : CertificateToken[] = [];
    for(let contract of contracts){
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

export const fetchDashboardData = async (user: User) : Promise<DashboardData> => {
    const userAccount  = await fetchUserAccount(user, false);
    if(!userAccount) {
        throw notFound();
    }
    const userAddress =  Address.fromPublicKey(userAccount.publicKey);
    const provider = new ContractsProvider();
    const ledgerAccount = await provider.ledger.account.getAccount({accountId: userAddress.getNumericId(),})

    const materials = (user.publicMetadata?.materials as MaterialInfo[]) ?? [];
    const contractIds = materials.map((material) => material.stockContractId);
    const stockContracts = await provider.getManyStockContracts(contractIds);

    const certificateContractIds = new Set<string>();
    for(let contract of stockContracts){
        const d= contract.getData();
        if(d.certificateContractId){
            certificateContractIds.add(d.certificateContractId)
        }
    }
    const certificateTokens = await fetchCertificateTokens(Array.from(certificateContractIds), ledgerAccount);
    return {
        balance: ledgerAccount.guaranteedBalanceNQT,
        certificateTokens,
        materials: []
    }
}
