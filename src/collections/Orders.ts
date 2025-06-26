import { CollectionConfig } from "payload";
import { isSuperAdmin } from "@/lib/access";

export const Orders: CollectionConfig = {
    slug: "orders",
    admin: {
        useAsTitle: "name",
        group: "Customers",
    },
    access: {
        read: () => true,
        create: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
        update: ({ req }) => isSuperAdmin(req.user),
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "customer",
            type: "relationship",
            relationTo: "customers",
            hasMany: false,
            required: true,
        },
        {
            name: "isPaid",
            type: "checkbox",
            required: true,
            defaultValue: false,
        },
        {
            name: "orderItems",
            type: "array",
            required: true,
            fields: [
                {
                    name: "product",
                    type: "text",
                    required: true,
                },
                {
                    name: "category",
                    type: "text",
                },
                {
                    name: "quantity",
                    type: "number",
                    required: true
                },
                {
                    name: "unitPrice",
                    type: "number",
                },
                {
                    name: "discountPerItem",
                    type: "number",
                    defaultValue: 0,
                },
                {
                    name: "grossItemAmount",
                    type: "number",
                },
            ]
        },
        {
            name: 'orderDate',
            type: 'date',
        },
        {
            name: 'grossAmount',
            type: 'number',
        },
        {
            name: 'discountAmount',
            type: 'number',
            defaultValue: 0
        },
        {
            name: 'taxAmount',
            type: 'number',
            defaultValue: 0
        },
        {
            name: 'shippingAmount',
            type: 'number',
            defaultValue: 0
        },
        {
            name: 'saleAmount',
            type: 'number',
            defaultValue: 0
        },
        {
            name: "razorpayCheckoutSessionId",
            type: "text",
            admin: {
                description: "Checkout session associated with the order."
            }
        },
        {
            name: "razorpayOrderId",
            type: "text",
        },
    ]
}