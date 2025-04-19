import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setCartAmount,
  setCartCount,
  setCartItems,
  setIsSeller,
  setProduct,
  setUser,
} from "./userSlice";
import { dummyProducts } from "../../assets/assets";
import toast from "react-hot-toast";
import { instance } from "../../services/api";

//feth user auth-status,user data, cart items;
export const fetchUser = createAsyncThunk(
  "user/fetUser",
  async (_, { dispatch }) => {
    try {
      const { data } = await instance.get("/api/user/is-auth", {
        withCredentials: true,
      });
      if (data.success) {
        dispatch(setUser(data.user));
        dispatch(setCartItems(data.user.cartItems));
      }
    } catch (error) {
      dispatch(setUser(null));
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "user/fetchProducts",
  async (_, { dispatch }) => {
    try {
      const { data } = await instance.get("/api/product/list");
      if (data.success) {
        dispatch(setProduct(data.products));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
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
    dispatch(getCartCount());
    dispatch(getCartAmount());
    toast.success("Added to Cart");
  }
);

export const updateCartItem = createAsyncThunk(
  "user/updateCartItem",
  async ({ itemId, quantity }, { getState, dispatch }) => {
    const { cartItems } = getState().user;
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    // console.log(cartData);
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
    dispatch(getCartCount());
    dispatch(getCartAmount());
    toast.success("Removed From Cart");
  }
);

export const getCartCount = createAsyncThunk(
  "user/getCartCount",
  async (_, { getState, dispatch }) => {
    const { cartItems } = getState().user;
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    dispatch(setCartCount(totalCount));
  }
);

export const getCartAmount = createAsyncThunk(
  "user/getCartAmount",
  async (_, { getState, dispatch }) => {
    const { cartItems, products } = getState().user;
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    dispatch(setCartAmount(Math.floor(totalAmount * 100) / 100));
  }
);
