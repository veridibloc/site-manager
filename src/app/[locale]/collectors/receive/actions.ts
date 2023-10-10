'use server'
import {z} from 'zod'
import {ContractsProvider} from '@/common/contractsProvider';
import {boomify, notFound, unauthorized} from '@hapi/boom';
import {currentUser} from '@clerk/nextjs';
import {fetchUserAccount} from '@/back/fetchUserAccount';
import {decrypt} from '@/back/crypto';
import {getEnv} from '@/common/getEnv';
import {NonSecureSigner} from '@veridibloc/smart-contracts';
import {generateMasterKeys} from '@signumjs/crypto';

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
        if(!user){
            throw unauthorized();
        }

        const  {materialId, quantity, collectorId} = parsedData
        const contractsProvider = new ContractsProvider();
        const contract = await contractsProvider.getCollectorTokenContractSingleton();// check if exists!
        const collectorAccount = await contractsProvider.ledger.account.getAccount({
            accountId: parsedData.collectorId,
            includeCommittedAmount: false,
            includeEstimatedCommitment: false,
        })
        if(!collectorAccount){
            throw notFound(`Collector ${parsedData.collectorId} not found!`)
        }

        const userAccount  = await fetchUserAccount(user, true)
        if(!userAccount){
            throw notFound("User Account not found!")
        }
        const seed = decrypt(userAccount.encryptedSeed ?? "", getEnv("AES_SECRET"))
        const {
            publicKey,
            signPrivateKey,
        } = generateMasterKeys(seed)

        if(publicKey.toLowerCase() !== userAccount.publicKey.toLowerCase()){
            throw unauthorized("Public Key Mismatch");
        }

        contract.signer = new NonSecureSigner({
            ledger: contract.ledger,
            publicKey,
            privateKey: signPrivateKey
        })
        const txId = await contract.grantCollectorToken(materialId, quantity, collectorId);
        console.info("Collection registered and collector token granted...", txId);
        return Promise.resolve({result: "ok", txId: txId!.transaction})
    } catch (e: any) {
        const boom = boomify(e);
        console.error(boom);
        return Promise.reject(boom);
    }
}
