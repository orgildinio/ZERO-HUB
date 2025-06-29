import { Tenant } from '@/payload-types';
import { caller } from '@/trpc/server';
import { Button } from '@payloadcms/ui';
import '../index.scss'

export const dynamic = "force-dynamic"

export const SubscriptionUpgradeButton = async () => {
    const session = await caller.auth.session();
    const tenant = session.user?.tenants?.[0].tenant as Tenant

    if (tenant.subscription?.subscriptionDetailsSubmitted) {
        return (
            <div className="subscription-button-wrapper">
                <Button
                    className="subscription-button subscription-button--upgrade"
                    buttonStyle="secondary"
                >
                    <span className="subscription-button__icon">⚙️</span>
                    <span className="subscription-button__text">
                        <span className="subscription-button__main">Manage Plan</span>
                        <span className="subscription-button__sub">Upgrade or modify</span>
                    </span>
                </Button>
            </div>
        )
    }
    return null
}