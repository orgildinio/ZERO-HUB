import { isSuperAdmin } from "@/lib/access";
import { CollectionConfig } from "payload";

export const MonthlySalesSummary: CollectionConfig = {
    slug: 'monthly-sales-summary',
    access: {
        create: ({ req }) => isSuperAdmin(req.user),
        read: ({ req }) => isSuperAdmin(req.user),
        update: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
        useAsTitle: "month",
        hidden: ({ user }) => !isSuperAdmin(user)
    },
    fields: [
        {
            name: 'month',
            type: 'text',
            required: true
        },
        {
            name: 'year',
            type: 'text',
            required: true
        },
        {
            name: 'totalOrders',
            type: 'number',
            required: true,
        },
        {
            name: 'grossSales',
            type: 'number',
            required: true,
        },
        {
            name: 'netSales',
            type: 'number',
            required: true,
        },
        {
            name: 'totalItemsSold',
            type: 'number',
            required: true,
        },
        {
            name: 'averageOrderValue',
            type: 'number',
            required: true
        }
    ]
}