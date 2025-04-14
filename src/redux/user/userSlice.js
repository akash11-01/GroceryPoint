import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  isSeller: false,
  products: null,
  loginForm: false,
  products: [],
  cartItems: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    showUserLoginForm: (state, action) => {
      state.loginForm = action.payload;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
    setProduct: (state, action) => {
      // console.log(1);
      state.products = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const {
  signInStart,
  signOut,
  setProduct,
  setCartItems,
  signInFailure,
  signInSuccess,
  showUserLoginForm,
} = userSlice.actions;

export default userSlice.reducer;
