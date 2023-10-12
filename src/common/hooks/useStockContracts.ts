import {ContractsProvider} from '@/common/contractsProvider';
import useSWR from 'swr';
import {useAccountContext} from '@/common/hooks/useAccountContext';
export const useStockContracts = () => {
    const account = useAccountContext()
    const {isLoading, data, error} = useSWR(`/api/stock-contracts/${account.publicKey}`, async () => {
        const stockContractIds = account.materials.map( m => m.stockContractId)
        const provider = new ContractsProvider(process.env.NEXT_PUBLIC_SIGNUM_DEFAULT_NODE);
        return provider.getManyStockContracts(stockContractIds);
    }, {
        refreshInterval: 120_000,
    })

    return {
        isLoading,
        contracts: data
    }
}
