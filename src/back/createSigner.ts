import {fetchUserAccount} from '@/back/fetchUserAccount';
import {notFound, unauthorized} from '@hapi/boom';
import {decrypt} from '@/back/crypto';
import {getEnv} from '@/common/getEnv';
import {generateMasterKeys} from '@signumjs/crypto';
import {NonSecureSigner} from '@veridibloc/smart-contracts';
import {currentUser} from '@clerk/nextjs';
import {Ledger} from '@signumjs/core';

export async function createSigner(ledger: Ledger) {
    const user = await currentUser();
    if (!user) {
        throw unauthorized();
    }

    const userAccount = await fetchUserAccount(user, true)
    if (!userAccount) {
        throw notFound("User Account not found!")
    }
    const seed = decrypt(userAccount.encryptedSeed ?? "", getEnv("AES_SECRET"))
    const {
        publicKey,
        signPrivateKey,
    } = generateMasterKeys(seed)

    if (publicKey.toLowerCase() !== userAccount.publicKey.toLowerCase()) {
        throw unauthorized("Public Key Mismatch");
    }

    return new NonSecureSigner({
        ledger,
        publicKey,
        privateKey: signPrivateKey
    })
}
