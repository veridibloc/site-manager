export interface MaterialInfo {
    stockContractId: string;
    type: string;
}
export interface UserAccount {
    publicKey: string;
    email: string;
    materials: MaterialInfo[];
    firstName: string;
    isActive: boolean;
    encryptedSeed?: string;
}
