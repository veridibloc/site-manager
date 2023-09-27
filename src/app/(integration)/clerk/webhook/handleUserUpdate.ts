import { UserWebhookEvent, UserJSON } from '@clerk/nextjs/server'
import db from '@/back/prisma'

export async function handleUserUpdate(event: UserWebhookEvent) {
    const user = event.data as UserJSON;
    console.log("Updating user:", user.email_addresses[0].email_address);
    await db.user.update({
        where: {
            email: user.email_addresses[0].email_address,
        },
        data: {
            firstName: user.first_name,
            lastName: user.last_name,
        }
    })
}
