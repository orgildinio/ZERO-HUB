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

// Helper function to calculate remaining trial days
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

    // Determine current step and what's needed next
    const getCurrentStep = () => {
        if (!hasActiveSubscription && isTrialActive) return 'trial'
        if (!hasActiveSubscription && !isTrialActive) return 'expired'
        if (hasActiveSubscription && !hasBankDetails) return 'bank-verification'
        if (hasActiveSubscription && hasBankDetails) return 'complete'
        return 'trial'
    }

    const currentStep = getCurrentStep()

    // Get appropriate banner configuration
    const getBannerConfig = () => {
        switch (currentStep) {
            case 'trial':
                return {
                    type: 'info' as const,
                    title: `Free Trial: ${trialDaysRemaining} ${trialDaysRemaining === 1 ? 'day' : 'days'} remaining`,
                    message: trialDaysRemaining <= 3
                        ? 'Your trial expires soon. Purchase a subscription to continue accessing your account.'
                        : 'Explore all features during your trial period.'
                }
            case 'expired':
                return {
                    type: 'error' as const,
                    title: 'Trial Period Expired',
                    message: 'Purchase a subscription to regain access to your account and continue using our services.'
                }
            case 'bank-verification':
                return {
                    type: 'info' as const,
                    title: 'Complete Account Setup',
                    message: 'Your subscription is active. Verify your bank details to start uploading and selling products.'
                }
            case 'complete':
                return {
                    type: 'success' as const,
                    title: 'Account Setup Complete',
                    message: 'Your account is fully configured. You can now upload products and manage your business.'
                }
            default:
                return {
                    type: 'info' as const,
                    title: 'Welcome to ZERO | HUB',
                    message: 'Complete the steps below to get started.'
                }
        }
    }

    const bannerConfig = getBannerConfig()

    return (
        <div className={baseClass}>
            <Banner className={`${baseClass}__banner`} type={bannerConfig.type}>
                <h4>{bannerConfig.title}</h4>
                <p>{bannerConfig.message}</p>
            </Banner>

            {/* Progress Steps */}
            <div className={`${baseClass}__progress`}>
                <h5>Setup Progress</h5>
                <div className={`${baseClass}__steps`}>
                    {/* Step 1: Subscription */}
                    <div className={`${baseClass}__step ${hasActiveSubscription ? 'completed' : currentStep === 'expired' ? 'urgent' : 'pending'}`}>
                        <div className={`${baseClass}__step-indicator`}>
                            {hasActiveSubscription ? '✓' : '1'}
                        </div>
                        <div className={`${baseClass}__step-content`}>
                            <h6>Purchase Subscription</h6>
                            <p>
                                {hasActiveSubscription
                                    ? 'Subscription is active and ready to use'
                                    : isTrialActive
                                        ? `Complete before trial expires (${trialDaysRemaining} ${trialDaysRemaining === 1 ? 'day' : 'days'} left)`
                                        : 'Required to access your account'
                                }
                            </p>
                            {!hasActiveSubscription && (
                                <div className={`${baseClass}__step-action`}>
                                    <SubscriptionVerifyButton />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Step 2: Bank Verification */}
                    <div className={`${baseClass}__step ${hasBankDetails ? 'completed' : hasActiveSubscription ? 'pending' : 'disabled'}`}>
                        <div className={`${baseClass}__step-indicator`}>
                            {hasBankDetails ? '✓' : '2'}
                        </div>
                        <div className={`${baseClass}__step-content`}>
                            <h6>Verify Bank Details</h6>
                            <p>
                                {hasBankDetails
                                    ? 'Bank details verified successfully'
                                    : hasActiveSubscription
                                        ? 'Required to receive payments from product sales'
                                        : 'Available after subscription purchase'
                                }
                            </p>
                            {hasActiveSubscription && !hasBankDetails && (
                                <div className={`${baseClass}__step-action`}>
                                    <TenantBankVerifyButton />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Step 3: Start Selling */}
                    <div className={`${baseClass}__step ${(hasActiveSubscription && hasBankDetails) ? 'ready' : 'disabled'}`}>
                        <div className={`${baseClass}__step-indicator`}>
                            {(hasActiveSubscription && hasBankDetails) ? '🚀' : '3'}
                        </div>
                        <div className={`${baseClass}__step-content`}>
                            <h6>Upload Products</h6>
                            <p>
                                {(hasActiveSubscription && hasBankDetails)
                                    ? 'Ready to upload and sell your products'
                                    : 'Complete previous steps to unlock product uploads'
                                }
                            </p>
                            {(hasActiveSubscription && hasBankDetails) && (
                                <div className={`${baseClass}__step-action`}>
                                    <div className="subscription-button-wrapper">
                                        <Link href="/admin/collections/products" className="subscription-button-link">
                                            <button className="subscription-button subscription-button--ready">
                                                <span className="subscription-button__icon">📦</span>
                                                <span className="subscription-button__text">
                                                    <span className="subscription-button__main">Upload Products</span>
                                                    <span className="subscription-button__sub">Start selling now</span>
                                                </span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscription Management (only show if subscription is active) */}
            {hasActiveSubscription && (
                <div className={`${baseClass}__management`}>
                    <h5>Subscription Management</h5>
                    <div className={`${baseClass}__management-item`}>
                        <div className={`${baseClass}__management-content`}>
                            <h6>Current Plan</h6>
                            <p>Manage your subscription settings or upgrade to unlock additional features.</p>
                        </div>
                        <div className={`${baseClass}__management-action`}>
                            <SubscriptionUpgradeButton />
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Start Guide (only show when setup is complete) */}
            {(hasActiveSubscription && hasBankDetails) && (
                <div className={`${baseClass}__quick-start`}>
                    <h5>Quick Start Guide</h5>
                    <div className={`${baseClass}__guide-items`}>
                        <div className={`${baseClass}__guide-item`}>
                            <span className="guide-number">1</span>
                            <div>
                                <strong>Upload Your First Product</strong>
                                <p>Add product details, images, and pricing to start selling</p>
                            </div>
                        </div>
                        <div className={`${baseClass}__guide-item`}>
                            <span className="guide-number">2</span>
                            <div>
                                <strong>Customize Your Store</strong>
                                <p>Configure your store settings and branding</p>
                            </div>
                        </div>
                        <div className={`${baseClass}__guide-item`}>
                            <span className="guide-number">3</span>
                            <div>
                                <strong>Track Your Sales</strong>
                                <p>Monitor orders and manage customer relationships</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Help Section */}
            <div className={`${baseClass}__help`}>
                <p>
                    Need assistance? Contact our support team or check the
                    <a href="/docs" target="_blank" rel="noopener noreferrer"> documentation</a> for detailed guides.
                </p>
            </div>
        </div>
    )
}

export default BeforeDashboard