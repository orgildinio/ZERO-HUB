import Razorpay from 'razorpay';

export const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZOR_PAY_SECRET_KEY as string,
})