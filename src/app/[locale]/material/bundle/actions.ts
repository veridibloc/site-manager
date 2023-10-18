'use server'

import { z } from 'zod'
import {ContractsProvider} from '@/common/contractsProvider';
import {createSigner} from '@/back/createSigner';
import {boomify} from '@hapi/boom';

const schema = z.object({
    materialContractId: z.string(),
    numberOfLots: z.number().gt(0),
})


export async function bundleMaterial(prevState: any, formData: FormData) {
    try {
        const parsedData = schema.parse({
            materialContractId: formData.get("material"),
            numberOfLots: Number(formData.get("numberLots")),
        })

        // TODO: better logging
        console.log("bundleMaterial", parsedData);

        const {materialContractId, numberOfLots} = parsedData
        const contractsProvider = new ContractsProvider();
        const contract = await contractsProvider.getStockContract(materialContractId);// check if exists!
        contract.signer = await createSigner(contract.ledger)

        const {lotUnitQuantity, stockQuantity} = contract.getData();
        if(stockQuantity/lotUnitQuantity < numberOfLots){
            throw new Error("Not enough units in stock");
        }

        const txId = await contract.registerOutgoingLot(numberOfLots);
        console.info(`Created ${numberOfLots} lot(s) for contract ${materialContractId}`);
        return {success: txId!.transaction};
    } catch (e: any) {
        const boom = boomify(e);
        console.error("Boom", boom);
        return {error: boom.output.payload.message};
    }
}
