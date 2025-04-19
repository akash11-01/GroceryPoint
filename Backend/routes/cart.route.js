import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { updateCart } from "../controllers/cart.controller.js";

const app = express.Router();

app.post("/update", authUser, updateCart);

export default app;
