import {CollectorTokenContractService} from "@veridibloc/smart-contracts"
import {Ledger, LedgerClientFactory} from '@signumjs/core';
import {Amount} from '@signumjs/util';
import {getEnv} from '@/common/getEnv';

export class ContractsProvider {
    private readonly _ledger: Ledger;

    constructor() {
        this._ledger = LedgerClientFactory.createClient({
            nodeHost: getEnv("NEXT_PUBLIC_SIGNUM_DEFAULT_NODE")
        })
    }

    get ledger() {
        return this._ledger;
    }


    getCollectorTokenContractService() {
        return new CollectorTokenContractService({
            ledger: this.ledger,
            activationCosts: Amount.fromSigna(0.5),
            baseTransactionFee: Amount.fromSigna(0.01),
        })
    }

    getCollectorTokenContractSingleton() {
        return this.getCollectorTokenContractService().with(getEnv("NEXT_PUBLIC_CONTRACTS_COLLECTOR_TOKEN_ID"))
    }
}




