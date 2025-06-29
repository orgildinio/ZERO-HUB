import { Tenant } from '@/payload-types';
import { caller } from '@/trpc/server';
import { Button, Link } from '@payloadcms/ui';
import '../index.scss'

export const dynamic = "force-dynamic"

export const TenantBankVerifyButton = async () => {
    const session = await caller.auth.session();
    const tenant = session.user?.tenants?.[0].tenant as Tenant

    if (tenant.bankDetails?.bankDetailsSubmitted) {
        return (
            <div className="subscription-button-wrapper">
                <Button
                    disabled
                    className="subscription-button subscription-button--completed"
                >
                    <span className="subscription-button__icon">✓</span>
                    <span className="subscription-button__text">
                        <span className="subscription-button__main">Bank Verified</span>
                        <span className="subscription-button__sub">Ready for payments</span>
                    </span>
                </Button>
            </div>
        )
    }

    return (
        <div className="subscription-button-wrapper">
            <Link href='/bank-details' className="subscription-button-link">
                <Button
                    className="subscription-button subscription-button--verify"
                    buttonStyle="primary"
                >
                    <span className="subscription-button__icon">🏦</span>
                    <span className="subscription-button__text">
                        <span className="subscription-button__main">Verify Bank Details</span>
                        <span className="subscription-button__sub">Enable payments</span>
                    </span>
                </Button>
            </Link>
        </div>
    )
}