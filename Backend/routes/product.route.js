import express from "express";
import { upload } from "../config/multer.js";
import {
  addProduct,
  changeStock,
  productById,
  productList,
} from "../controllers/product.controller.js";
import { authSeller } from "../middlewares/authSeller.js";

const app = express.Router();
app.post("/add", upload.array("images"), authSeller, addProduct);
app.get("/list", productList);
app.get("/id", productById);
app.post("/stock", authSeller, changeStock);

export default app;
