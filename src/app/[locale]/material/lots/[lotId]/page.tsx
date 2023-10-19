import {notFound} from 'next/navigation';
import {LotDetailsPage} from './_components/lotDetailsPage';
import {ContractsProvider} from '@/common/contractsProvider';

async function getStockContract(contractId: string) {
    return new ContractsProvider().getStockContract(contractId)
}

export default async function Page({params: {lotId}}: { params: { lotId: string } }) {
    const [stockContractId, lotNumber] = lotId.split('-');

    if (!stockContractId || !lotNumber) {
        return notFound()
    }
    const stockContract = await getStockContract(stockContractId)

    if (!stockContract) {
        return notFound()
    }

    const [receipt, incomingTransactions, lotMapValues] = await Promise.all([
        stockContract.getSingleLotReceipt(Number(lotNumber)),
        stockContract.getLotTransactions(Number(lotNumber)),
        stockContract.getKeyMapValues(lotNumber)
    ])

    const lotTransactionId = lotMapValues ? lotMapValues.keyValues[0].key2 : ""
    const lotBlockHeight = Number(lotMapValues ? lotMapValues.keyValues[0].value : 0)


    const transactionRequests = [
        stockContract.ledger.transaction.getTransaction(lotTransactionId),
        receipt && receipt.value != '0' ? stockContract.ledger.transaction.getTransaction(receipt.value) : Promise.resolve(null),
        ...incomingTransactions.map( t => stockContract.ledger.transaction.getTransaction(t.transactionId))
    ]

    const [lotTransaction, receiptTransaction, ...materialTransactions] = await Promise.all(transactionRequests);
    return (
        <LotDetailsPage data={{
            lotNumber,
            lotWeight: stockContract.getData().lotUnitQuantity,
            stockContractId,
            lotTransaction: lotTransaction!,
            // @ts-ignore
            materialTransactions: materialTransactions,
            receiptTransaction
        }}/>
    )
}
