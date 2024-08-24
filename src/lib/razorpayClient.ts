import razorpay from 'razorpay';

export const getClient = () => {
    return new razorpay({
        key_id: process.env.RAZORPAY_KEY_ID as string,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })
}
