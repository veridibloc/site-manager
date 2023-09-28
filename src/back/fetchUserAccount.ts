import { cache } from 'react'
import {UserAccount} from '@/types/userAccount';
import {Address} from '@signumjs/core';
import prisma from '@/back/prisma';
export const revalidate = 3600 // revalidate the data at most every hour

export const fetchUserAccount = cache(async (email: string) : Promise<UserAccount | null> => {


    const user = await prisma.user.findUnique({ where: { email } })

    console.log("user", user)

    if(!user) return null;

    return {
        email: user.email,
        address: Address.fromPublicKey(user.publicKey),
        firstName: user.firstName ?? "",
        isActive: user.status === "Active"
    }
})
