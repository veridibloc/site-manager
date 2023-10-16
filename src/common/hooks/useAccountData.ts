import useSWR from 'swr';
import {useAccountContext} from '@/common/hooks/useAccountContext';
import {getLedger} from '@/common/getLedger';
import {Address} from '@signumjs/core';
export const useAccountData = () => {
    const account = useAccountContext()
    const {isLoading, data, error} = useSWR(`/api/account-data/${account.publicKey}`, async () => {
        const ledger = getLedger(process.env.NEXT_PUBLIC_SIGNUM_DEFAULT_NODE || "");
        const address = Address.fromPublicKey(account.publicKey)
        return ledger.account.getAccount({
            accountId: address.getNumericId(),
            includeCommittedAmount: false,
            includeEstimatedCommitment: false
        })
    }, {
        refreshInterval: 120_000,
    })

    return {
        isLoading,
        account: data
    }
}
