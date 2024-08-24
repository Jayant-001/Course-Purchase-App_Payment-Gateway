import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Verify the payment by its signature
// when payment is success: Razorpay creates a signature using orderid, secret and paymentid 
// we can verify the signature provided by client by creating the same signature using orderid, secret and paymentid
// if the signatures are matched means data provided by user is correct
// after verification we can perform post payment operations like update DB
export async function POST(request: NextRequest) {
    const { order_id, payment_id, signature } = await request.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
        return new NextResponse(
            JSON.stringify({
                success: false,
                message: "Secret key is not configured",
            }),
            { status: 500 }
        );
    }

    // Create HMAC object
    const hmac = crypto.createHmac("sha256", secret);

    hmac.update(order_id + "|" + payment_id);

    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
        // DB operations can be added here

        // Return payment verified response
        return new NextResponse(
            JSON.stringify({ success: true, message: "Payment verified" }),
            { status: 200 }
        );
    } else {
        return new NextResponse(
            JSON.stringify({ success: false, message: "Payment not verified" }),
            { status: 400 }
        );
    }
}
