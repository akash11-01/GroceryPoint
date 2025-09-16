import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { instance } from "../services/api";
import toast from "react-hot-toast";

// imput field component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full p-2 border border-gray-500/30 rounded outline-none text-gray-500
    focus:border-[#4fbf8b] transition "
    type={type}
    placeholder={placeholder}
    value={address[name]}
    name={name}
    onChange={handleChange}
    required
  />
);
export default function AddAddress() {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await instance.post(
        "/api/address/add",
        { address },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/cart");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  return (
    <div className="mt-8 pb-8 px-2 sm:px-4 md:px-8 lg:px-24">
      <p className="text-xl sm:text-2xl md:text-3xl text-gray-500 text-center md:text-left">
        Add shipping{" "}
        <span className="font-semibold text-[#4fbf8b]">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between items-center md:items-start mt-6 md:mt-10 gap-8 md:gap-0">
        {/* left page */}
        <div className="w-full max-w-md mx-auto md:mx-0 flex-1">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              type="email"
              name="email"
              address={address}
              placeholder="Email address"
            />
            <InputField
              handleChange={handleChange}
              type="text"
              name="street"
              address={address}
              placeholder="Street"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                type="text"
                address={address}
                name="city"
                placeholder="City"
              />
              <InputField
                handleChange={handleChange}
                type="text"
                address={address}
                name="state"
                placeholder="State"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                type="number"
                address={address}
                name="zipcode"
                placeholder="Zip code"
              />
              <InputField
                handleChange={handleChange}
                type="text"
                address={address}
                name="country"
                placeholder="Country"
              />
            </div>

            <InputField
              handleChange={handleChange}
              type="text"
              address={address}
              name="phone"
              placeholder="Phone"
            />

            <button
              className="w-full mt-6 bg-[#4fbf8b] text-white py-3
                        hover:bg-[#44ae7c] transition cursor-pointer uppercase text-base sm:text-sm"
            >
              Save address
            </button>
          </form>
        </div>

        {/* right part */}
        <img
          src={assets.add_address_iamge}
          alt="addAddress"
          className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-72 lg:w-80 lg:h-96 object-contain md:mr-16 mb-8 md:mb-16 md:mt-0"
        />
      </div>
    </div>
  );
}
