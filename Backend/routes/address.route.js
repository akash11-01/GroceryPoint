import express from "express";
import { addAddress, getAddress } from "../controllers/address.controller.js";
import { authUser } from "../middlewares/authUser.js";

const app = express.Router();

app.post("/add", authUser, addAddress);
app.get("/get", authUser, getAddress);

export default app;
