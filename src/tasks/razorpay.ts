import { razorpay } from "@/lib/razorpay";

// const product = await razorpay.products.requestProductConfiguration('acc_Qiz5NSyCT0NU9h', {
//     product_name: "route",
// })

await razorpay.accounts.delete('acc_Qiz5NSyCT0NU9h')

// const account = await razorpay.accounts.create({
//     email: 'test@gmail.com',
//     phone: '9999999999',
//     legal_business_name: 'Test',
//     business_type: "individual",
//     contact_name: 'TEST',
//     type: 'route',
//     profile: {
//         category: 'healthcare',
//         subcategory: 'clinic',
//         addresses: {
//             registered: {
//                 street1: "507, Koramangala 1st block",
//                 street2: "MG Road",
//                 city: "Bengaluru",
//                 state: "KARNATAKA",
//                 postal_code: "560034",
//                 country: "IN"
//             }
//         }
//     },
//     legal_info: {
//         pan: 'AAACL1234C'
//     }
// });
// console.log(account)
// console.log(product)