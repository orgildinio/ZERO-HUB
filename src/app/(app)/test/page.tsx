import React from 'react'

import { TemplateProvider } from '@/providers/template-provider'

const Page = () => {
    return (
        <TemplateProvider template={'mojito'} tenant={'cactus'} />
    )
}

export default Page