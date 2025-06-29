import { Tenant } from '@/payload-types';
import { caller } from '@/trpc/server';
import { Button, Link } from '@payloadcms/ui';
import '../index.scss'

export const dynamic = "force-dynamic"

export const SubscriptionVerifyButton = async () => {
    const session = await caller.auth.session();
    const tenant = session.user?.tenants?.[0].tenant as Tenant

    if (tenant.subscription?.subscriptionDetailsSubmitted) {
        return (
            <div className="subscription-button-wrapper">
                <Button
                    disabled
                    className="subscription-button subscription-button--completed"
                >
                    <span className="subscription-button__icon">✓</span>
                    <span className="subscription-button__text">
                        <span className="subscription-button__main">Subscription Active</span>
                        <span className="subscription-button__sub">Ready to use</span>
                    </span>
                </Button>
            </div>
        )
    }

    return (
        <div className="subscription-button-wrapper">
            <Link href='/subscription' className="subscription-button-link">
                <Button
                    className="subscription-button subscription-button--primary"
                    buttonStyle="primary"
                >
                    <span className="subscription-button__icon">💳</span>
                    <span className="subscription-button__text">
                        <span className="subscription-button__main">Purchase Subscription</span>
                        <span className="subscription-button__sub">Get full access</span>
                    </span>
                </Button>
            </Link>
        </div>
    )
}