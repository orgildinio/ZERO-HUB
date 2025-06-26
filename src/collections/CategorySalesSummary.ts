import { isSuperAdmin } from "@/lib/access";
import { CollectionConfig } from "payload";

export const CategorySalesSummary: CollectionConfig = {
    slug: 'category-sales-summary',
    admin: {
        useAsTitle: "categoryName",
        hidden: ({ user }) => !isSuperAdmin(user)
    },
    hooks: {
        beforeChange: [
            async ({ data, req, operation }) => {
                if (data.category && (!data.categoryName || operation === 'create')) {
                    try {
                        const category = await req.payload.findByID({
                            collection: 'categories',
                            id: data.category,
                        });
                        
                        data.categoryName = category.name;
                    } catch (error) {
                        req.payload.logger.error(`Error fetching category: ${error}`);
                    }
                }
                
                return data;
            }
        ]
    },
    fields: [
        {
            name: 'category',
            type: "relationship",
            relationTo: 'categories',
            required: true,
        },
        {
            name: 'categoryName',
            type: "text",
            required: true,
            admin: {
                readOnly: true,
                description: "This field is automatically populated based on the selected category"
            }
        },
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
    ]
}