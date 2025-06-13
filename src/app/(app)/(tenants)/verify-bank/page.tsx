import React, { Suspense } from 'react'
import { redirect } from 'next/navigation'

import { VerifyBankView } from '@/modules/subscriptions/ui/views/verify-bank-view'
import { ThemeProvider } from '@/providers/theme-provider'
import { Header } from '@/modules/auth/ui/components/header'
import { caller } from '@/trpc/server'

export const dynamic = "force-dynamic"

const VerifyBank = async () => {

    const session = await caller.auth.session();
    if (!session.user) redirect('/login')

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Header />
            <Suspense>
                <VerifyBankView email={session.user.email} phone={session.user.phone} />
            </Suspense>
        </ThemeProvider>
    )
}

export default VerifyBank