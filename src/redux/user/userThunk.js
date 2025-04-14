import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCartItems, setProduct } from "./userSlice";
import { dummyProducts } from "../../assets/assets";
import toast from "react-hot-toast";

export const fetchProducts = createAsyncThunk(
  "user/fetchProducts",
  async (_, { dispatch }) => {
    dispatch(setProduct(dummyProducts));
  }
);

export const addToCart = createAsyncThunk(
  "user/addToCart",
  async (itemId, { getState, dispatch }) => {
    const { cartItems } = getState().user;
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    dispatch(setCartItems(cartData));
    toast.success("Added to Cart");
  }
);

export const updateCartItem = createAsyncThunk(
  "user/updateCartItem",
  async ({ itemId, quantity }, { getState, dispatch }) => {
    const { cartItems } = getState().user;
    let cartData = structuredClone(cartItems);

    cartData[itemId] = quantity;
    dispatch(setCartItems(cartData));
    toast.success("Cart Updated");
  }
);

export const removeFromCart = createAsyncThunk(
  "user/removeFromCart",
  async (itemId, { getState, dispatch }) => {
    const { cartItems } = getState().user;
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    dispatch(setCartItems(cartData));
    toast.success("Removed From Cart");
  }
);
