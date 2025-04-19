import { v2 as cloudinary } from "cloudinary";
import { Product } from "../models/product.model.js";

export const addProduct = async (req, res, next) => {
  try {
    let productData = JSON.parse(req.body.productData);
    const images = req.files;
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await Product.create({ ...productData, image: imagesUrl });
    res.status(200).json({ success: true, message: "Product added" });
  } catch (error) {
    next(error);
  }
};

export const productList = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

export const productById = async (req, res, next) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// change product Instock
export const changeStock = async (req, res, next) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.status(200).json({ success: true, message: "Stock updated" });
  } catch (error) {
    next(error);
  }
};
