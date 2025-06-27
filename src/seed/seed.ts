// import { payload } from "@/lib/payload";

import { razorpay } from "../lib/razorpay";

// const tenant = await payload.create({
//     collection: "tenants",
//     data: {
//         store: 'admin',
//         phone: '+917400106790',
//         slug: 'admin',
//         name: 'admin',
//         activeTemplate: 'default'
//     }
// })

// await payload.create({
//     collection: "users",
//     data: {
//         username: 'admin',
//         phone: '+917400106790',
//         tenants: [
//             {
//                 tenant: tenant.id
//             }
//         ],
//         roles: ['super-admin'],
//         email: 'ashishjadhav9900@gmail.com',
//         password: 'Ashish@1022'
//     }
// })

// process.exit(0)

await razorpay.accounts.delete('acc_QluExPLD565ir2');