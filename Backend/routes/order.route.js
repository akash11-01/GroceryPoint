import express from "express";
import { authUser } from "../middlewares/authUser.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderStripe,
} from "../controllers/order.controller.js";
import { authSeller } from "../middlewares/authSeller.js";

const app = express.Router();

app.post("/cod", authUser, placeOrderCOD);
app.get("/user", authUser, getUserOrders);
app.get("/seller", authSeller, getAllOrders);
app.post("/stripe", authUser, placeOrderStripe);

export default app;
