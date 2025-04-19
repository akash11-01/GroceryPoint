// upadate user cart data;

import { User } from "../models/user.model.js";

export const updateCart = async (req, res, next) => {
  try {
    const user = req.user;
    const { cartItems } = req.body;

    await User.findByIdAndUpdate(user._id, { cartItems });
    res.status(201).json({ success: true, message: "Cart updated" });
  } catch (error) {
    next(error);
  }
};
