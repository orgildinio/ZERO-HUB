import React from 'react'
import { useTemplate } from '@/providers/template-provider'
import { templateComponents } from '@/config/template-registry'

export const useTemplateComponent = (componentName: string) => {
    const { template } = useTemplate()

    const components = templateComponents[template as keyof typeof templateComponents]
    if (!components) {
        return () => <div>Template "{template}" not found</div>
    }

    const Component = components[componentName as keyof typeof components]
    if (!Component) {
        return () => <div>Component "{componentName}" not found in template "{template}"</div>
    }

    return Component
}