
import data from "@/modules/tenants/ui/components/data.json"
import { CategoryChart } from "@/modules/analytics/ui/components/sales/category-chart"
import { ProductsOverview } from "@/modules/analytics/ui/components/sales/products-overview"
import { TotalSalesLineChart } from "@/modules/analytics/ui/components/sales/total-sales-line-chart"
import { GrossNetSales } from "@/modules/analytics/ui/components/sales/gross-net-sales"

export const SalesView = () => {
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                <GrossNetSales />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 px-4 lg:px-6 gap-4 w-full">
                <div className="col-span-1 w-full">
                    <CategoryChart />
                </div>
                <div className="col-span-2">
                    <TotalSalesLineChart />
                </div>
            </div>
            <ProductsOverview data={data} />
        </div>
    )
}