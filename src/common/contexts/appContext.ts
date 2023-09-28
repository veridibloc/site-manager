import {createContext} from 'react';
export interface AppContextType {
    Ledger: {
        AddressPrefix: string
        ExplorerUrl: string
    }
}

const isMainNet = process.env.NEXT_PUBLIC_SIGNUM_NETWORK === "Signum"
export const AppContext = createContext<AppContextType>({
    Ledger: {
        AddressPrefix: isMainNet ? "S" : "TS",
        ExplorerUrl: isMainNet ? "https://chain.signum.network" : "https://t-chain.signum.network"
    }
})
