import {useContext, useMemo} from 'react';
import {AccountContext} from '@/common/contexts/accountContext';
import {Address} from '@signumjs/core';
import {AppContext} from '@/common/contexts/appContext';

export function useUserAddress() {
    const account = useContext(AccountContext)
    const {Ledger: {AddressPrefix}} = useContext(AppContext)

    return useMemo(() => {
        return Address.fromPublicKey(account.publicKey, AddressPrefix)
    }, [account.publicKey, AddressPrefix]);
}
