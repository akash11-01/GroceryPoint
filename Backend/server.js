import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import sellerRouter from "./routes/seller.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import addressRouter from "./routes/address.route.js";
import orderRouter from "./routes/order.route.js";
import { connectCloudinary } from "./config/cloudinary.js";
import { stripeWebhooks } from "./controllers/order.controller.js";

dotenv.config({});
const app = express();
const port = process.env.PORT || 4000;

await connectDb();
await connectCloudinary();

//allow multiple origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://grocery-point-frontend.vercel.app/",
];
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// MiddleWare configuration
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin: allowedOrigins,
    // credentials: true,
  })
);

app.get("/", (req, res) => res.send("api working"));
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
