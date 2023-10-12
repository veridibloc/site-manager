import {cache} from 'react'
import {MaterialInfo, UserAccount} from '@/types/userAccount';
import prisma from '@/back/prisma';
import {User} from '@clerk/backend';

export const revalidate = 3600 // revalidate the data at most every hour

export const fetchUserAccount = cache(async (user: User, withSeed = false): Promise<UserAccount | null> => {
    const account = await prisma.account.findUnique({where: {userId: user.id}})

    if (!account) return null;

    const materials = (user.publicMetadata?.materials as MaterialInfo[]) ?? [];

    return {
        email: user.emailAddresses[0].emailAddress,
        materials,
        publicKey: account.publicKey,
        firstName: user.firstName ?? "",
        isActive: account.status === "Active",
        encryptedSeed: withSeed ? account.encSeed : undefined,
    }
})
