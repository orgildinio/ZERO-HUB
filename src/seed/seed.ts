import { payload } from "@/lib/payload";

const seed = async () => {

    const adminTenant = await payload.create({
        collection: "tenants",
        data: {
            name: "admin",
            slug: "admin",
            phone: "7400106790",
            store: 'admin',
        }
    });

    await payload.create({
        collection: "users",
        data: {
            email: "ashishjadhav9900@gmail.com",
            password: "Ashish@1022",
            roles: ["super-admin"],
            username: "admin",
            phone: "7400106790",
            tenants: [
                {
                    tenant: adminTenant.id,
                }
            ]
        }
    });

    console.log('🎉 All seeding operations completed successfully!');
}

await seed();
process.exit(0);