import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { handleSubscriptionActivated } from './_utils';

const secret = process.env.RAZORPAY_WEBHOOK_SECRET as string;

export type SubscriptionPayload = {
    event: string;
    payload: {
        subscription: {
            entity: {
                id: string
                customer_id: string
                status: string
                start_at: number
                end_at: number
                current_start: number
                current_end: number
                charge_at: number
                remaining_count: number
                paid_count: number
                notes: {
                    tenantId: string
                    planId: string
                }
            }
        };
    };
};

export async function POST(req: NextRequest) {
    try {
        const signature = req.headers.get('x-razorpay-signature') as string;
        const body = await req.json();
        const payload: SubscriptionPayload = body;

        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(JSON.stringify(payload))
            .digest('hex');

        if (signature !== expectedSignature) {
            return new NextResponse("Signature invalid", { status: 401 });
        }
        switch (payload.event) {
            case 'subscription.activated':
                await handleSubscriptionActivated(payload);
                return NextResponse.redirect('https://zerohub.site/admin')
            default:
                console.log('Unhandled webhook event:', payload.event);
        }
        return NextResponse.json({ recieved: true, status: 200 })
    } catch {
        return new NextResponse('Webhook error', { status: 500 })
    }
}