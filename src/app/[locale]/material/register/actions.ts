'use server'

import {z} from 'zod'
import {boomify} from '@hapi/boom';
import {ContractsProvider} from '@/common/contractsProvider';
import {createSigner} from '@/back/createSigner';


const schema = z.object({
    materialContractId: z.string(),
    quantity: z.number().gt(0),
})


export async function registerMaterial(prevState: any, formData: FormData) {

    try {
        const parsedData = schema.parse({
            materialContractId: formData.get("material"),
            quantity: Number(formData.get("quantity")),
        })

        // TODO: better logging
        console.log("registerMaterial", parsedData);

        const {materialContractId, quantity} = parsedData
        const contractsProvider = new ContractsProvider();
        const contract = await contractsProvider.getStockContract(materialContractId);// check if exists!
        contract.signer = await createSigner(contract.ledger)

        const txId = await contract.registerIncomingMaterial(quantity)
        console.info(`Incoming Material for contract ${materialContractId} registered and collector token granted...`);
        return {success: txId!.transaction};
    } catch (e: any) {
        const boom = boomify(e);
        console.error("Boom", boom);
        return {error: boom.output.payload.message};
    }
}
