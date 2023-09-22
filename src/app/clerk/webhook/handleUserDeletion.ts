import {UserJSON, UserWebhookEvent } from '@clerk/nextjs/server'
import db from  '@/back/prisma'

export async function handleUserDeletion(event: UserWebhookEvent) {
    const user = event.data as UserJSON;
    await db.user.update({
        where: {
            email: user.email_addresses[0].email_address,
        },
        data: {
            status: "Inactive",
        }
    })
}
