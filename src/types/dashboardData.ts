export interface CertificateToken {
    name: string;
    id: string;
    decimals: number;
    quantity: string;
}

export interface ChartDataItem {
    name: string;
    unbundled: number;
    lots: number;
    sold: number;
}

export interface CollectionMaterial {
    id: string,
    quantity: number
}

export interface TokenMetadata {
    name: string;
    decimals: number;
    id: string
}

export interface CollectorStats {
    tokenMetadata: TokenMetadata,
    grantedTokens: number,
    collectorCount: number,
    collectedMaterial: CollectionMaterial[],
}
export interface DashboardData {
    balance: string;
    certificateTokens : CertificateToken[];
    chartData: ChartDataItem[];
    collectorStats: CollectorStats;
}
