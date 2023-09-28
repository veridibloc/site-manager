import {UserAccount} from '@/types/userAccount';
import {createContext} from 'react';

export const AccountContext = createContext<UserAccount>({
    publicKey: '',
    email: '',
    firstName: '',
    isActive: false
});
