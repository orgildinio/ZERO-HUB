import { isSuperAdmin } from "@/lib/access";
import { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
    slug: "tenants",
    indexes: [
        {
            fields: ['slug', 'subscriptionStatus'],
            unique: false
        }
    ],
    access: {
        create: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user)
    },
    admin: {
        useAsTitle: "slug",
        hidden: ({ user }) => !isSuperAdmin(user)
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            label: "Store name",
            admin: {
                description: "This is the name of the store (e.g. Ashish's Store)."
            },
        },
        {
            name: "slug",
            type: "text",
            index: true,
            required: true,
            unique: true,
            admin: {
                readOnly: true,
                description: "This is the subdomain of the store (e.g. [slug].hub.com)."
            },
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            }
        },
        {
            name: "image",
            relationTo: "media",
            type: "upload",
            admin: {
                description: "Store logo"
            },
        },
        {
            name: "phone",
            required: true,
            type: "text",
            unique: true,
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            }
        },
        {
            name: "store",
            required: true,
            type: "text",
        },
        // TODO: Add templates relations
        // TODO: Add customizations relations
        // {
        //     name: "template",
        //     type: "relationship",
        //     relationTo: "templates",
        //     admin: {
        //         description: "Templates you have purchased.",
        //         position: "sidebar"
        //     },
        //     access: {
        //         read: ({ req }) => isSuperAdmin(req.user),
        //         update: ({ req }) => isSuperAdmin(req.user)
        //     }
        // },
        {
            name: "subscriptionId",
            type: "text",
            admin: {
                description: "Payment AccountId associated with your shop."
            },
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            }
        },
        {
            name: "subscriptionDetailsSubmitted",
            type: "checkbox",
            admin: {
                description: "You cannot create products until you submit your payment details."
            },
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            }
        },
        {
            name: "subscriptionStatus",
            type: "select",
            index: true,
            options: [
                { label: 'Active', value: 'active' },
                { label: 'Paused', value: 'paused' },
                { label: 'Cancelled', value: 'cancelled' },
                { label: 'Expired', value: 'expired' },
                { label: 'None', value: 'none' },
            ],
            defaultValue: 'none',
            admin: {
                description: "You cannot create products until you subscriptions is active."
            },
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            }
        },
        // TODO: Add subscription-plans relation
        {
            name: 'subscriptionStartDate',
            type: 'date',
            admin: {
                description: "Tenant's Subscription start data."
            },
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            }
        },
        {
            name: 'subscriptionEndDate',
            type: 'date',
            admin: {
                description: "Store will be unavailable after this date if subscription not renewed."
            },
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            }
        },
        // TODO: Add settings relation
    ]
}