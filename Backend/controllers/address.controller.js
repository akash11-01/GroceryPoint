import { Address } from "../models/address.model.js";

export const addAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = user._id;
    const { address } = req.body;
    await Address.create({ ...address, userId });
    res
      .status(201)
      .json({ success: true, message: "Address added successfully" });
  } catch (error) {
    next(error);
  }
};

//get address
export const getAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = user._id;
    const addresses = await Address.find({ userId });
    res.status(201).json({ success: true, addresses });
  } catch (error) {
    next(error);
  }
};
