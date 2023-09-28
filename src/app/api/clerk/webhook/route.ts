import {Webhook} from 'svix'
import {headers} from 'next/headers'
import {UserWebhookEvent, WebhookEvent} from '@clerk/nextjs/server'
import {NextResponse} from 'next/server';
import {handleUserCreation} from './handleUserCreation';
import {handleUserUpdate} from './handleUserUpdate';
import {handleUserDeletion} from './handleUserDeletion';
import {getEnv} from '@/common/getEnv';


export async function GET() {
    return NextResponse.json({status: "ok"})
}

export async function POST(req: Request) {
    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);
    // Verify the payload with the headers
    let evt: WebhookEvent
    try {
        const webhook = new Webhook(getEnv('CLERK_WEBHOOK_SECRET'));
        evt = webhook.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        })
    }

    const {id} = evt.data;
    const eventType = evt.type;
    console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
    switch (evt.type) {
        case "user.created":
            await handleUserCreation(evt as UserWebhookEvent);
            break;
        case 'user.updated':
            await handleUserUpdate(evt as UserWebhookEvent);
            break;
        case 'user.deleted':
            await handleUserDeletion(evt as UserWebhookEvent);
            break;
        default:
            return new Response(`Unsupported Webhook Event: ${eventType}`, {status: 422})
    }

    return new Response('', {status: 201})
}
