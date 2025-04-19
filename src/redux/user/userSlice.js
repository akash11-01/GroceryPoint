import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isSeller: false,
  products: null,
  loginForm: false,
  products: [],
  cartItems: {},
  searchQuery: [],
  cartCount: null,
  cartAmount: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.loginForm = false;
    },
    showUserLoginForm: (state, action) => {
      state.loginForm = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    setCartAmount: (state, action) => {
      state.cartAmount = action.payload;
    },
    setIsSeller: (state, action) => {
      state.isSeller = action.payload;
    },
  },
});

export const {
  signInStart,
  signOut,
  setProduct,
  setCartItems,
  signInFailure,
  setCartAmount,
  setCartCount,
  setUser,
  setIsSeller,
  setSearchQuery,
  showUserLoginForm,
} = userSlice.actions;

export default userSlice.reducer;
