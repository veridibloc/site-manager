import { cache } from 'react'
import {UserAccount} from '@/types/userAccount';
import {Address} from '@signumjs/core';
import prisma from '@/back/prisma';
import {User} from '@clerk/backend';
export const revalidate = 3600 // revalidate the data at most every hour

export const fetchUserAccount = cache(async (user: User) : Promise<UserAccount | null> => {
    const account = await prisma.account.findUnique({ where: { userId: user.id } })
    if(!account) return null;

    return {
        email: user.emailAddresses[0].emailAddress,
        address: Address.fromPublicKey(account.publicKey),
        firstName: user.firstName ?? "",
        isActive: account.status === "Active"
    }
})
