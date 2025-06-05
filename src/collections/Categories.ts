import { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";

export const Categories: CollectionConfig = {
    slug: "categories",
    access: {
        create: ({ req }) => {
            if (isSuperAdmin(req.user)) return true
            const tenant = req.user?.tenants?.[0].tenant as Tenant
            return Boolean(tenant?.subscriptionDetailsSubmitted)
        }
    },
    admin: {
        useAsTitle: 'name',
        description: "You must verify your account before creating category."
    },
    fields: [
        {
            type: "text",
            name: "name",
            required: true,
            maxLength: 100
        },
        {
            name: "slug",
            type: "text",
            required: true,
            index: true,
            admin: {
                description: "This is the path of the category on store (e.g. [slug].zerohub.site/[slug])."
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.name) {
                            return data.name
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, '-')
                                .replace(/^-+|-+$/g, '')
                        }
                        return value
                    }
                ]
            }
        },
        {
            name: "description",
            type: "textarea",
            maxLength: 500
        },
        {
            name: "status",
            type: "select",
            options: [
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
                { label: "Draft", value: "draft" }
            ],
            defaultValue: "active",
            required: true,
            index: true
        },
        {
            name: "featured",
            type: "checkbox",
            defaultValue: false,
            admin: {
                description: "Display this category prominently on the homepage"
            }
        },
        {
            name: "sortOrder",
            type: "number",
            defaultValue: 0,
            admin: {
                description: "Lower numbers appear first"
            }
        },
        {
            name: "parent",
            type: "relationship",
            relationTo: "categories",
            hasMany: false,
            filterOptions: ({ data }) => ({
                id: { not_equals: data?.id },
            })
        },
        {
            name: "subcategories",
            type: "join",
            collection: "categories",
            on: "parent",
            hasMany: true
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media"
        },
        {
            name: "banner",
            type: "upload",
            relationTo: "media",
            admin: {
                description: "Banner image for category pages"
            }
        },
        {
            name: "seo",
            type: "group",
            fields: [
                {
                    name: "title",
                    type: "text",
                    maxLength: 60,
                    admin: {
                        description: "SEO title"
                    }
                },
                {
                    name: "description",
                    type: "textarea",
                    maxLength: 160,
                    admin: {
                        description: "Meta description (recommended: 150-160 characters)"
                    }
                },
                {
                    name: "keywords",
                    type: "text",
                    admin: {
                        description: "Comma-separated keywords"
                    }
                }
            ]
        },
        {
            name: "productCount",
            type: "number",
            virtual: true,
            admin: {
                readOnly: true,
                description: "Number of products in this category"
            },
            access: {
                read: () => true,
            },
            hooks: {
                afterRead: [
                    async ({ data, req }) => {
                        if (!data?.id) return 0

                        try {
                            const productCount = await req.payload.find({
                                collection: "products",
                                where: {
                                    categories: { in: [data.id] },
                                },
                                limit: 0
                            })

                            return productCount.totalDocs
                        } catch {
                            return 0
                        }
                    }
                ]
            }
        },
    ]
}