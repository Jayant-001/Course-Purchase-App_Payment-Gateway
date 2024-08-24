# Course Purchase App

This is a Next.js application that allows users to browse a list of courses and purchase them using Razorpay as the payment gateway. The application is styled using Tailwind CSS and Shadcn for the user interface.

## Features

- **Course Listing**: Displays a list of available courses.
- **Course Purchase**: Allows users to purchase a course with Razorpay.
- **Responsive Design**: Uses Tailwind CSS for styling and responsive design.
- **User Notifications**: Alerts users upon successful payment.

## Tech Stack

- **Next.js**: Framework for building React applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Shadcn**: Component library for UI components.
- **Razorpay**: Payment gateway for processing transactions.

## Setup

To get this application up and running locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/course-purchase-app.git
cd course-purchase-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install

```

### 3. Configure Environment Variables
Create a .env.local file in the root directory of the project and add your environment variables:

```
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
SERVER_URL=http://localhost:3000

NEXT_PUBLIC_RAZORPAY_KEY_ID=your_public_razorpay_key_id

```

Replace your_razorpay_key_id, your_razorpay_key_secret, and your_public_razorpay_key_id with your actual Razorpay credentials.

### 4. Run the Development Server

```
npm run dev
# or
yarn dev

```

Open your browser and navigate to http://localhost:3000 to see the application in action.