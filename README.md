# GreenCart

GreenCart is a full-stack grocery e-commerce web application built with the MERN ecosystem. It allows users to browse products, search by category, manage a cart, save delivery addresses, and place orders using **Cash on Delivery** or **Stripe** payments. It also includes a separate **seller/admin panel** to log in, add products, manage inventory, and view customer orders.

**Live Demo:** https://grocery-point-frontend.vercel.app/

---

## Features

### Customer Side

- User registration and login with JWT-based authentication
- Browse all grocery products
- Search products from the navbar
- Filter products by category
- View detailed product information
- Add and update cart items
- Save delivery addresses
- Place orders with:
  - Cash on Delivery (COD)
  - Stripe online payment
- View order history
- Responsive navigation for desktop and mobile

### Seller Side

- Seller login with protected routes
- Add new products with multiple image uploads
- Upload product images to Cloudinary
- View product list
- Update product stock availability
- View all customer orders

---

## Tech Stack

### Frontend

- React 19
- Vite
- React Router DOM
- Redux Toolkit
- Redux Persist
- Axios
- React Hot Toast
- Tailwind CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Cookie Parser
- CORS
- Multer
- Cloudinary
- Stripe


---

## Main Modules

### Backend API Routes

- `/api/user` → register, login, logout, auth check
- `/api/seller` → seller login, logout, auth check
- `/api/product` → add product, list products, get product by id, update stock
- `/api/cart` → update cart
- `/api/address` → add and fetch addresses
- `/api/order` → place COD order, place Stripe order, get user orders, get seller orders
- `/stripe` → Stripe webhook handler

---

## Environment Variables

Create a `.env` file inside the `Backend` folder and add:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

SELLER_EMAIL=your_seller_email
SELLER_PASSWORD=your_seller_password
```

Create a `.env` file inside the `Frontend` folder and add:

```env
VITE_BACKEND_URL=http://localhost:4000
```

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/akash11-01/GreenCart.git
cd GreenCart
```

### 2. Setup the backend

```bash
cd Backend
npm install
npm run server
```

Backend runs on:

```bash
http://localhost:4000
```

### 3. Setup the frontend

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## How It Works

1. A user signs up or logs in.
2. Products are fetched from MongoDB and displayed on the frontend.
3. Users can search, browse categories, and add items to the cart.
4. Delivery addresses are stored before checkout.
5. Orders can be placed either through COD or Stripe.
6. Seller/admin can log in separately to add products and manage stock.
7. Product images are uploaded using Multer and stored in Cloudinary.

---

## Authentication

- User authentication uses **JWT tokens stored in HTTP-only cookies**.
- Seller authentication is handled separately using seller-specific credentials from environment variables.
- Protected routes are secured using custom middleware for both users and sellers.

---

## Payment Integration

Stripe is integrated for online payments.

- Checkout sessions are created from the backend
- Payment success redirects users to their orders page
- Stripe webhooks verify payment completion
- Failed payments remove incomplete orders automatically

---

## Database Models

The application mainly uses these MongoDB models:

- **User** → name, email, password, cartItems
- **Product** → name, description, price, offerPrice, image, category, inStock
- **Address** → shipping and contact details
- **Order** → userId, items, amount, address, status, paymentType, isPaid

---
## Deployment

The project is structured for separate frontend and backend deployment:

- **Frontend:** Vercel
- **Backend:** Can be deployed on Vercel, Render, Railway, or any Node.js hosting platform
- **Database:** MongoDB Atlas
- **Media Storage:** Cloudinary

---

If you like this project, consider giving it a star on GitHub.
