import React from 'react'
import { Banner } from '@payloadcms/ui/elements/Banner'
import { Tenant } from '@/payload-types'
import { caller } from '@/trpc/server'
import { SubscriptionUpgradeButton } from './subscription-upgrade'
import { SubscriptionVerifyButton } from './subscription-purchase'
import { TenantBankVerifyButton } from './tenant-verify'
import './index.scss'
import Link from 'next/link'

const baseClass = 'before-dashboard'

const calculateTrialDaysRemaining = (createdAt: string): number => {
    const trialPeriodDays = 14
    const createdDate = new Date(createdAt)
    const currentDate = new Date()
    const daysSinceCreation = Math.floor((currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, trialPeriodDays - daysSinceCreation)
}

const BeforeDashboard: React.FC = async () => {
    const session = await caller.auth.session()
    const tenant = session.user?.tenants?.[0].tenant as Tenant

    if (!tenant) {
        return (
            <div className={baseClass}>
                <Banner className={`${baseClass}__banner`} type="error">
                    <h4>Unable to load account information</h4>
                    <p>Please refresh the page or contact support if the issue persists.</p>
                </Banner>
            </div>
        )
    }

    const trialDaysRemaining = calculateTrialDaysRemaining(tenant.createdAt)
    const isTrialActive = trialDaysRemaining > 0
    const hasActiveSubscription = tenant.subscription?.subscriptionDetailsSubmitted
    const hasBankDetails = tenant.bankDetails?.bankDetailsSubmitted

    return (
        <div className={baseClass}>
            {/* Trial Status - Only show if trial is active */}
            {isTrialActive && (
                <div className={`${baseClass}__trial-status`}>
                    <div className={`${baseClass}__trial-badge ${trialDaysRemaining <= 3 ? 'urgent' : ''}`}>
                        <span className={`${baseClass}__trial-days`}>{trialDaysRemaining}</span>
                        <span className={`${baseClass}__trial-text`}>
                            {trialDaysRemaining === 1 ? 'day' : 'days'} remaining
                        </span>
                    </div>
                    {trialDaysRemaining <= 3 && (
                        <p className={`${baseClass}__trial-warning`}>
                            Your trial expires soon. Purchase a subscription to continue.
                        </p>
                    )}
                </div>
            )}

            {/* Expired Trial Banner */}
            {!isTrialActive && !hasActiveSubscription && (
                <Banner className={`${baseClass}__banner`} type="error">
                    <h4>Trial Period Expired</h4>
                    <p>Purchase a subscription to regain access to your account.</p>
                </Banner>
            )}

            {/* Simple Progress Steps */}
            <div className={`${baseClass}__steps`}>
                {/* Step 1: Subscription */}
                <div className={`${baseClass}__step`}>
                    <div className={`${baseClass}__step-indicator ${hasActiveSubscription ? 'completed' : 'pending'}`}>
                        {hasActiveSubscription ? '✓' : '1'}
                    </div>
                    <div className={`${baseClass}__step-content`}>
                        <span className={`${baseClass}__step-title`}>Purchase Subscription</span>
                        {hasActiveSubscription ? (
                            <span className={`${baseClass}__step-status completed`}>Active</span>
                        ) : (
                            <SubscriptionVerifyButton />
                        )}
                    </div>
                </div>

                {/* Step 2: Bank Verification */}
                <div className={`${baseClass}__step`}>
                    <div className={`${baseClass}__step-indicator ${hasBankDetails ? 'completed' : hasActiveSubscription ? 'pending' : 'disabled'}`}>
                        {hasBankDetails ? '✓' : '2'}
                    </div>
                    <div className={`${baseClass}__step-content`}>
                        <span className={`${baseClass}__step-title`}>Verify Bank Details</span>
                        {hasBankDetails ? (
                            <span className={`${baseClass}__step-status completed`}>Verified</span>
                        ) : hasActiveSubscription ? (
                            <TenantBankVerifyButton />
                        ) : (
                            <span className={`${baseClass}__step-status disabled`}>Requires subscription</span>
                        )}
                    </div>
                </div>

                {/* Step 3: Upload Products */}
                <div className={`${baseClass}__step`}>
                    <div className={`${baseClass}__step-indicator ${(hasActiveSubscription && hasBankDetails) ? 'ready' : 'disabled'}`}>
                        {(hasActiveSubscription && hasBankDetails) ? '🚀' : '3'}
                    </div>
                    <div className={`${baseClass}__step-content`}>
                        <span className={`${baseClass}__step-title`}>Upload Products</span>
                        {(hasActiveSubscription && hasBankDetails) ? (
                            <Link href="/admin/collections/products" className={`${baseClass}__upload-link`}>
                                Start uploading →
                            </Link>
                        ) : (
                            <span className={`${baseClass}__step-status disabled`}>Complete previous steps</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Subscription Management - Only show if active */}
            {hasActiveSubscription && (
                <div className={`${baseClass}__management`}>
                    <span>Manage your subscription</span>
                    <SubscriptionUpgradeButton />
                </div>
            )}

            {/* Help Link */}
            <div className={`${baseClass}__help`}>
                <a href="/docs" target="_blank" rel="noopener noreferrer">
                    Need help? Check our documentation
                </a>
            </div>
        </div>
    )
}

export default BeforeDashboard