export const getGrossNetSales = () => {
    await redis.get("").watch()
}