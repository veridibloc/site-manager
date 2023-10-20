import {createContext} from 'react';
export interface AppContextType {
    Ledger: {
        DefaultNode: string,
        AddressPrefix: string
        Ticker: string
        ExplorerUrl: string
    },
    CollectionMaterials: Record<string,string>
}

const isMainNet = process.env.NEXT_PUBLIC_SIGNUM_NETWORK === "Signum"
export const AppContext = createContext<AppContextType>({
    Ledger: {
        DefaultNode: process.env.NEXT_PUBLIC_SIGNUM_DEFAULT_NODE || "http://localhost:6876",
        AddressPrefix: isMainNet ? "S" : "TS",
        Ticker: isMainNet ? "SIGNA" : "TSIGNA",
        ExplorerUrl: isMainNet ? "https://chain.signum.network" : "https://t-chain.signum.network",
    },
    CollectionMaterials: {
        "1": "plastic",
        "2": "paper",
        "3": "glass"
    }
})
