import { LedgerClientFactory } from '@signumjs/core';

export function getLedger(nodeHost: string) {
    return LedgerClientFactory.createClient({
        nodeHost
    })
}
