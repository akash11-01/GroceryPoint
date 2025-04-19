import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsSeller } from "../../redux/user/userSlice";
import { instance } from "../../services/api";
import toast from "react-hot-toast";

export default function SellerLogin() {
  const { isSeller } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await instance.post(
        "/api/seller/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (data.success) {
        dispatch(setIsSeller(true));
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center text-sm text-gray-600"
      >
        <div
          className="flex flex-col gap-5 m-auto items-start p-8
            py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200 "
        >
          <p className="text-2xl font-medium m-auto">
            <span className="text-[#4fbf8b]">Seller</span> Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter Your Email"
              required
              className="border border-gray-200 rounded w-full p-2 mt1 outline-[#4fbf8b]"
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-gray-200 rounded w-full p-2 mt1 outline-[#4fbf8b]"
              required
              type="password"
              placeholder="Enter Your Password"
            />
          </div>
          <button className="bg-[#4fbf8b] text-white w-full py-2 rounded-md cursor-pointer">
            Login
          </button>
        </div>
      </form>
    )
  );
}
