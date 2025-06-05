import { isSuperAdmin } from "@/lib/access";
import { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
    slug: "tenants",
    indexes: [
        {
            fields: ['slug', 'subscription.subscriptionStatus'],
            unique: false
        },
        {
            fields: ['phone'],
            unique: true
        },
        {
            fields: ['subscription.subscriptionEndDate', 'subscription.subscriptionStatus'],
            unique: false
        }
    ],
    access: {
        create: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
        useAsTitle: "slug",
        hidden: ({ user }) => !isSuperAdmin(user),
        preview: (doc) => {
            return `https://${doc.slug}.zerohub.site`
        }
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            label: "Tenant name.",
        },
        {
            name: "slug",
            type: "text",
            index: true,
            required: true,
            unique: true,
            admin: {
                readOnly: true,
                description: "This is the subdomain of the store (e.g. [slug].zerohub.site).",
                position: "sidebar"
            },
            access: {
                read: () => true,
                update: ({ req }) => isSuperAdmin(req.user)
            },
            validate: (value?: string | null) => {
                if (!value) return 'Slug is required';
                if (!/^[a-z0-9-]+$/.test(value)) {
                    return 'Slug can only contain lowercase letters, numbers, and hyphens';
                }
                if (value.length < 3) return 'Slug must be at least 3 characters';
                if (value.length > 50) return 'Slug must be less than 50 characters';
                return true;
            }
        },
        {
            name: "image",
            relationTo: "media",
            type: "upload",
            admin: {
                description: "Store logo (recommended: 200x200px PNG/JPG)"
            },
        },
        {
            name: "phone",
            required: true,
            type: "text",
            unique: true,
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            },
            admin: {
                description: "Primary contact phone number"
            },
            validate: (value?: string | null) => {
                if (!value) return 'Phone number is required';
                if (!/^\+?[\d\s\-\(\)]{10,}$/.test(value)) {
                    return 'Please enter a valid phone number';
                }
                return true;
            }
        },
        {
            name: "store",
            required: true,
            type: "text",
            admin: {
                description: "This is the name of the store (e.g. Ashish's Store)."
            },
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
            name: "subscription",
            type: "group",
            admin: {
                description: "Subscription and billing information"
            },
            fields: [
                {
                    name: "subscriptionId",
                    type: "text",
                    admin: {
                        description: "Payment AccountId associated with your shop."
                    },
                    access: {
                        read: ({ req }) => isSuperAdmin(req.user),
                        update: ({ req }) => isSuperAdmin(req.user)
                    }
                },
                {
                    name: "subscriptionDetailsSubmitted",
                    type: "checkbox",
                    defaultValue: false,
                    admin: {
                        description: "You cannot create products until you submit your payment details."
                    },
                    access: {
                        read: () => true,
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
                        { label: 'Trial', value: 'trial' },
                        { label: 'Suspended', value: 'suspended' }
                    ],
                    defaultValue: 'none',
                    admin: {
                        description: "You cannot create products until your subscription is active."
                    },
                    access: {
                        read: () => true,
                        update: ({ req }) => isSuperAdmin(req.user)
                    }
                },
                {
                    name: 'subscriptionStartDate',
                    type: 'date',
                    admin: {
                        description: "Tenant's subscription start date.",
                        date: {
                            pickerAppearance: 'dayAndTime'
                        }
                    },
                    access: {
                        read: () => true,
                        update: ({ req }) => isSuperAdmin(req.user)
                    }
                },
                {
                    name: 'subscriptionEndDate',
                    type: 'date',
                    admin: {
                        description: "Store will be unavailable after this date if subscription not renewed.",
                        date: {
                            pickerAppearance: 'dayAndTime'
                        }
                    },
                    access: {
                        read: () => true,
                        update: ({ req }) => isSuperAdmin(req.user)
                    }
                }
            ]
        },
        {
            name: "maxProducts",
            type: "number",
            defaultValue: 100,
            min: 0,
            admin: {
                description: "Maximum number of products allowed for this tenant",
                position: "sidebar"
            },
            access: {
                read: ({ req }) => isSuperAdmin(req.user),
                update: ({ req }) => isSuperAdmin(req.user)
            }
        },
        {
            name: "analytics",
            type: "group",
            admin: {
                description: "Usage analytics and metrics"
            },
            access: {
                read: ({ req }) => isSuperAdmin(req.user),
                update: () => false // Read-only, updated by system
            },
            fields: [
                {
                    name: "totalProducts",
                    type: "number",
                    defaultValue: 0,
                    admin: {
                        readOnly: true,
                        description: "Current number of products"
                    }
                },
            ]
        },
        // TODO: Add subscription-plans relation
        // TODO: Add settings relation
    ]
}