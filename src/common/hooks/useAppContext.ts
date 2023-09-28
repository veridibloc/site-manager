import {useContext} from 'react';
import {AppContext} from '@/common/contexts/appContext';

export function useAppContext() {
    return useContext(AppContext);
}
