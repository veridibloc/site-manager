import {useContext} from 'react';
import {AccountContext} from '@/common/contexts/accountContext';

export function useAccountContext() {
    return useContext(AccountContext);
}
