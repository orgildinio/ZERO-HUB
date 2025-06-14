import React, { Suspense } from 'react'
import { redirect } from 'next/navigation'

import { BankingLoading, VerifyBankView } from '@/modules/subscriptions/ui/views/verify-bank-view'
import { caller, getQueryClient, trpc } from '@/trpc/server'
import { Tenant } from '@/payload-types'
import { AlreadyVerified, BankDetailsAlreadySubmittedLoading } from '@/modules/subscriptions/ui/components/already-verified'

export const dynamic = "force-dynamic"

const VerifyBank = async () => {

    const session = await caller.auth.session();
    const tenant = session.user?.tenants?.[0]?.tenant as Tenant;
    if (!session.user) redirect('/login')
    else {
        if (tenant.bankDetails?.bankDetailsSubmitted) {

            const accountNumber = tenant.bankDetails.accountNumber
            const queryClient = getQueryClient();
            void queryClient.prefetchQuery(trpc.subscriptions.getTenantBankDetails.queryOptions({ accountNumber: accountNumber! }))

            return (
                <Suspense fallback={<BankDetailsAlreadySubmittedLoading />}>
                    <AlreadyVerified accountNumber={accountNumber!} />
                </Suspense>
            )
        }
    }

    return (
        <Suspense fallback={<BankingLoading />}>
            <VerifyBankView email={session.user.email} phone={session.user.phone} />
        </Suspense>
    )
}

export default VerifyBank