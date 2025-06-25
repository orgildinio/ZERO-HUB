import { SalesView } from '@/modules/tenants/ui/views/sales-view'
import React from 'react'

{/* Total Sales           Overall revenue over time (daily/weekly/monthly/yearly)
            Gross vs. Net Sales      Net excludes returns, discounts, taxes
            Sales by Product          Revenue breakdown per product
            Sales by Category         Revenue grouped by category/subcategory
            Sales by Region           City, state, or country-based sales
            Sales by Channel           Website, mobile app, POS, etc.
            Average Order Value (AOV)  Total revenue / Number of orders
            Time-based Trends          Sales comparison charts (e.g., week-over-week)
            Top-selling Products       Highest revenue or units sold
            Slow-moving Products       Products with low/no sales
            Refunds Issued             Count and value of refunded transactions */}

const page = () => {
    return (
        <SalesView
        />
    )
}

export default page