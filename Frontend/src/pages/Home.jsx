import React, { useEffect } from "react";
import MainBanner from "../components/MainBanner";
import Categories from "../components/Categories";
import BestSellers from "../components/BestSellers";
import BottomBanner from "../components/BottomBanner";
import { NewsLetter } from "../components/NewsLetter";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, getCartCount } from "../redux/user/userThunk";
import { instance } from "../services/api";
import toast from "react-hot-toast";

export default function Home() {
  const { currentUser, cartItems } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await instance.post(
          "/api/cart/update",
          { cartItems },
          { withCredentials: true }
        );
        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (currentUser) {
      fetchItems();
    }
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartCount());
  }, [dispatch]);

  return (
    <div className="mt-10">
      <MainBanner />
      <Categories />
      <BestSellers />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
}
