import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";
dotenv.config({});

export const sellerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res
        .cookie("seller_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ success: true, message: "Seller Logged In" });
    } else {
      return next(errorHandler(400, "Invalid Credentials"));
    }
  } catch (error) {
    next(error);
  }
};

export const isSellerAuth = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Seller Verified" });
  } catch (error) {
    next(error);
  }
};

export const sellerLogout = async (req, res, next) => {
  try {
    res
      .clearCookie("seller_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      })
      .status(200)
      .json({ success: true, message: "Seller Logged out" });
  } catch (error) {
    next(error);
  }
};
