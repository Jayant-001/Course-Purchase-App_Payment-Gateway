import { getClient } from "@/lib/razorpayClient";
import { getCourse } from "@/db/course";
import { NextRequest, NextResponse } from "next/server";

const razorClient = getClient();

// Create an order
export async function POST(request: NextRequest) {
    const { course_id, user_id } = await request.json();

    try {
        // fetch course from database 
        const course = await getCourse(course_id);

        // Define options for the Razorpay order
        const options = {
            amount: course.price * 100, // Multiply by 100 because razorpay takes last 2 digits as decimal value
            currency: "INR",
            receipt: "receipt_order_1", // name of receipt
        };

        // It creates an order object which contains details related to roder like amount, price, etc
        // Create a new Promise to handle the Razorpay order creation
        const order = await new Promise((resolve, reject) => {
            razorClient.orders.create(options, (err, order) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(order);
                }
            });
        });

        return new NextResponse(JSON.stringify({ order }), { status: 201 });
    } catch (error: any) {
        console.error("Error:", error);
        return new NextResponse(
            JSON.stringify({
                message: "Something went wrong",
                error: error.message,
            }),
            { status: 500 }
        );
    }
}
