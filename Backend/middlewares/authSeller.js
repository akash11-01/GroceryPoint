import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";
dotenv.config({});

export const authSeller = async (req, res, next) => {
  const { seller_token } = req.cookies;

  if (!seller_token) {
    return next(errorHandler(400, "Not Authorized"));
  }

  try {
    const decodeToken = jwt.verify(seller_token, process.env.JWT_SECRET);
    if (decodeToken.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return next(errorHandler(400, "Not Authorized!"));
    }
  } catch (error) {
    console.log("MiddleWare error", error);
    next(error);
  }
};
