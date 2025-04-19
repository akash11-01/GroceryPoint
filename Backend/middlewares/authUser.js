import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(errorHandler(400, "Not Authorized"));
  }

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodeToken.id) {
      //   console.log(decodeToken.id);
      const dbUser = await User.findById(decodeToken.id);
      req.user = dbUser;
      next();
    } else {
      return next(errorHandler(400, "Not Authorized!"));
    }
  } catch (error) {
    console.log("error aaya", error);
    next(error);
  }
};
