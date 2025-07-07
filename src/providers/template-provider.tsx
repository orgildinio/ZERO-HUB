import React, { createContext, useContext } from 'react'

import MojitoLayout from '@/templates/mojito/app/layout'

import MojitoPage from '@/templates/mojito/app/page'

const TemplateContext = createContext<{
    template: string
    tenant: string
} | null>(null)

export const useTemplate = () => {
    const context = useContext(TemplateContext)
    if (!context) {
        throw new Error('useTemplate must be used within a TemplateProvider')
    }
    return context
}

const templateLayouts = {
    mojito: MojitoLayout,
} as const

const templatePages = {
    mojito: MojitoPage,
} as const

export const TemplateProvider = ({
    template,
    tenant
}: {
    template: string
    tenant: string
}) => {
    const Layout = templateLayouts[template as keyof typeof templateLayouts]
    const App = templatePages[template as keyof typeof templatePages]

    if (!Layout || !App) {
        return <div>Template "{template}" not found</div>
    }

    return (
        <TemplateContext.Provider value={{ template, tenant }}>
            <Layout tenant={tenant}>
                <App tenant={tenant} />
            </Layout>
        </TemplateContext.Provider>
    )
}