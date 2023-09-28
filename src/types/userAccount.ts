import {Address} from '@signumjs/core';

export interface UserAccount {
    address: Address;
    email: string;
    firstName: string;
    isActive: boolean;
}
