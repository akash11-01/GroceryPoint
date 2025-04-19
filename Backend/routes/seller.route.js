import express from "express";
import {
  isSellerAuth,
  sellerLogin,
  sellerLogout,
} from "../controllers/seller.controller.js";
import { authSeller } from "../middlewares/authSeller.js";

const app = express.Router();

app.post("/login", sellerLogin);
app.get("/is-auth", authSeller, isSellerAuth);
app.get("/logout", sellerLogout);

export default app;
