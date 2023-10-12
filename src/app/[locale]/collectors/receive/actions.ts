'use server'
import {z} from 'zod'
import {ContractsProvider} from '@/common/contractsProvider';
import {boomify, notFound, unauthorized} from '@hapi/boom';
import {currentUser} from '@clerk/nextjs';
import {createSigner} from '@/back/createSigner';

const schema = z.object({
    collectorId: z.string(),
    materialId: z.string(),
    quantity: z.number().gt(0),
})

export async function registerCollection(prevState: any, formData: FormData) {

    try {
        const parsedData = schema.parse({
            collectorId: formData.get("collector"),
            materialId: formData.get("material"),
            quantity: Number(formData.get("quantity")),
        })

        // TODO: better logging
        console.log("registerCollection", parsedData);

        const user = await currentUser();
        if (!user) {
            throw unauthorized();
        }

        const contractsProvider = new ContractsProvider();
        const contract = await contractsProvider.getCollectorTokenContractSingleton();// check if exists!
        contract.signer = await createSigner(contractsProvider.ledger);
        const collectorAccount = await contractsProvider.ledger.account.getAccount({
            accountId: parsedData.collectorId,
            includeCommittedAmount: false,
            includeEstimatedCommitment: false,
        })
        if (!collectorAccount) {
            throw notFound(`Collector ${parsedData.collectorId} not found!`)
        }
        const {collectorId, materialId, quantity} =  parsedData
        const txId = await contract.grantCollectorToken(materialId, quantity, collectorId);
        console.info("Collection registered and collector token granted...", txId);
        return {success: txId!.transaction};
    } catch (e: any) {
        const boom = boomify(e);
        console.error("Boom", boom);
        return {error: boom.output.payload.message};
    }
}
