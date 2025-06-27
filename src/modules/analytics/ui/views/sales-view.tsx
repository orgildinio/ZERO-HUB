import data from '@/modules/tenants/ui/components/data.json'
import { GrossNetSales } from "../components/sales/gross-net-sales"
import { CategoryChart } from "../components/sales/category-chart"
import { TotalOrdersLineChart } from "../components/sales/total-orders-line-chart"
import { ProductsOverview } from "../components/sales/products-overview"

export const SalesView = ({ tenantId }: { tenantId: string }) => {
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                <GrossNetSales tenantId={tenantId} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 px-4 lg:px-6 gap-4 w-full">
                <div className="col-span-1 w-full">
                    <CategoryChart tenantId={tenantId} />
                </div>
                <div className="col-span-2">
                    <TotalOrdersLineChart tenantId={tenantId} />
                </div>
            </div>
            <ProductsOverview data={data} tenantId={tenantId} />
        </div>
    )
}