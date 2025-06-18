import { Tenant } from '@/payload-types';
import { caller } from '@/trpc/server';
import { Button } from '@payloadcms/ui';

export const dynamic = "force-dynamic"

export const SubscriptionUpgradeButton = async () => {

    const session = await caller.auth.session();
    const tenant = session.user?.tenants?.[0].tenant as Tenant
    if (tenant.subscription?.subscriptionDetailsSubmitted) {
        return (
            <Button>
                Upgrade Subscription
            </Button>
        )
    }
    return null
}