# **BACKEND**


# 🚀 VR World – Backend (Node.js + Express + MongoDB)

This is the **backend API** for the VR World MERN application.  
It handles authentication, products, bookings, orders, payments, and admin features.

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Stripe Payment Gateway
- dotenv
- CORS

---

## 🔐 Environment Variables

Create a `.env` file in the **backend root**:
```md
PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:3000
```

▶️ How to Run Backend

cd backend
npm install
npm run dev

Server will run at:

http://localhost:5000

✅ API Modules

Auth API – Login / Register

Product API – List Products

Booking API – Create & Fetch Bookings

Order API – User & Admin Orders

Contact API – Save Messages

Stripe API – Checkout & Payment Verification
