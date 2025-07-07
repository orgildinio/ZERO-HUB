import React from 'react'
import { useTemplate } from '@/providers/template-provider'
import { templatePages } from '@/config/template-registry'

export const useTemplatePage = (pageName: string) => {
    const { template } = useTemplate()

    const pages = templatePages[template as keyof typeof templatePages]
    if (!pages) {
        return () => <div>Template "{template}" not found</div>
    }

    const Page = pages[pageName as keyof typeof pages]
    if (!Page) {
        return () => <div>Page "{pageName}" not found in template "{template}"</div>
    }

    return Page
}