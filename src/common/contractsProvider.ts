import {CollectorTokenContractService, StockContractService} from "@veridibloc/smart-contracts"
import {Ledger} from '@signumjs/core';
import {Amount} from '@signumjs/util';
import {getEnv} from '@/common/getEnv';
import {getLedger} from '@/common/getLedger';

export class ContractsProvider {
    private readonly _ledger: Ledger;

    constructor(nodeHost?: string) {
        this._ledger = getLedger(nodeHost ?? getEnv("NEXT_PUBLIC_SIGNUM_DEFAULT_NODE"))
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


    getStockContractService() {
        return new StockContractService({
            ledger: this.ledger,
            activationCosts: Amount.fromSigna(1.0),
            baseTransactionFee: Amount.fromSigna(0.01),
            reference: getEnv("NEXT_PUBLIC_CONTRACTS_STOCK_REF"),
            codeHash: getEnv("NEXT_PUBLIC_CONTRACTS_STOCK_CODE_HASH")
        })
    }

    getStockContract(contractId: string) {
        return this.getStockContractService().with(contractId)
    }

    getManyStockContracts(contractIds: string[]){
        const service  = this.getStockContractService()
        const contractRequests = contractIds.map( id => service.with(id));
        return Promise.all(contractRequests);
    }

}




