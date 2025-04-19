import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartItems,
  setUser,
  showUserLoginForm,
} from "../redux/user/userSlice";
import { instance } from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getCartCount } from "../redux/user/userThunk";

export default function Login() {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await instance.post(
        `/api/user/${state}`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );

      if (data.success) {
        dispatch(setUser(data.user));
        dispatch(setCartItems(data.user.cartItems));
        dispatch(getCartCount());
        navigate("/");
        dispatch(showUserLoginForm(false));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      onClick={() => dispatch(showUserLoginForm(false))}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center 
        text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={submitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-[#4fbf8b]">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#4fbf8b]"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#4fbf8b]"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#4fbf8b]"
            type="password"
            required
          />
        </div>
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-[#4fbf8b] cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-[#4fbf8b] cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
        <button className="bg-[#4fbf8b] hover:bg-[#44ae7c] transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
}
