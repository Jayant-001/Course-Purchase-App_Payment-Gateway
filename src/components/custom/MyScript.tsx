"use client";
import React, { useEffect } from "react";

const MyScript = () => {

    // Code to load a script in html document
    // Creates s new script tag and set src and append it to html body element
    const loadScript = (src: string) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    }, []);

    return <div></div>;
};

export default MyScript;
