"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import axios from "axios";
import { useState } from "react";

interface Course {
    id: number;
    title: string;
    description: string;
    price: number;
    duration: number; // Duration can be in hours or another unit as needed
    instructor: string;
}

type Props = {
    course: Course;
};

const CourseCard = ({ course }: Props) => {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
        localStorage.setItem("user_id", "temp_user@gmail.com");
    }

    const [loading, setLoading] = useState(false);

    // Dummy card number - 6092427704735852
    const onCheckout = async (e: any) => {
        e.preventDefault();

        try {
            const course_id = course.id;
            const user_id = localStorage.getItem("user_id");
            setLoading(true);
            // create an order
            // we will receive an order object created on our backend
            const { data } = await axios.post(`/api/create-order`, {
                course_id,
                user_id,
            });

            const { order } = data;
            /*
                Dummy order object 
                {
                    "amount": 19499,
                    "amount_due": 19499,
                    "amount_paid": 0,
                    "attempts": 0,
                    "created_at": 1724486590,
                    "currency": "INR",
                    "entity": "order",
                    "id": "order_OofChaLSHLX0p6",
                    "notes": [],
                    "offer_id": null,
                    "receipt": "receipt_order_1",
                    "status": "created"
                }
            */

            const paymentObject = new (window as any).Razorpay({
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                order_id: order.id,
                ...order,

                // this handler will be called once the payment is success
                handler: function (response: any) {
                    const options = {
                        order_id: response.razorpay_order_id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                    };
                    // call server to verify payment and make operations after payment completion like
                    // update database by adding course to user's course-list.
                    axios
                        .post("/api/verify-payment", options)
                        .then((res) => {
                            if (res.data.success) {
                                alert("Payment completed.");
                            } else {
                                alert("Payment verification failed.");
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            alert("Payment verification failed.");
                        });
                },
            });

            paymentObject.open();
        } catch (error) {
            console.log(error);
            alert("Payment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="">
            <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Price: {course.price}</p>
                <p>Duration: {course.duration}</p>
                <p>Instructor: {course.instructor}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={onCheckout}>
                    {loading ? <div className="lds-dual-ring"></div> : " Buy"}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CourseCard;
