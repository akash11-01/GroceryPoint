import express from "express";
import {
  isAuth,
  login,
  logout,
  registerUser,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/authUser.js";

const app = express.Router();

app.post("/register", registerUser);
app.post("/login", login);
app.get("/is-auth", authUser, isAuth);
app.get("/logout", authUser, logout);

export default app;
