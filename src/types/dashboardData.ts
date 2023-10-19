export interface CertificateToken {
    name: string;
    id: string;
    decimals: number;
    quantity: string;
}


export interface MaterialInfo {

}

export interface DashboardData {
    balance: string;
    certificateTokens : CertificateToken[];
    materials: MaterialInfo[]
}
