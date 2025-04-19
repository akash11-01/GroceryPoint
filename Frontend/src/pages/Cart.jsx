import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { assets, dummyAddress } from "../assets/assets";
import { removeFromCart, updateCartItem } from "../redux/user/userThunk";
import { instance } from "../services/api";
import toast from "react-hot-toast";
import {
  setCartAmount,
  setCartCount,
  setCartItems,
} from "../redux/user/userSlice";

export const Cart = () => {
  const [showAddress, setShowAddress] = useState(false);
  const { products, cartItems, cartCount, cartAmount, currentUser } =
    useSelector((state) => state.user);
  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([dummyAddress]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const dispatch = useDispatch();

  const getCart = () => {
    let tempArr = [];
    for (const key in cartItems) {
      const product = products.find((product) => product._id === key);
      if (product) {
        const productWithQty = { ...product, quantity: cartItems[key] };
        tempArr.push(productWithQty);
      }
    }
    setCartArray(tempArr);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await instance.get("/api/address/get", {
        withCredentials: true,
      });
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  const navigate = useNavigate();

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }
      // place order with COD
      if (paymentOption === "COD") {
        const { data } = await instance.post(
          "/api/order/cod",
          {
            userId: currentUser._id,
            items: cartArray.map((item) => ({
              product: item._id,
              quantity: item.quantity,
            })),
            address: selectedAddress._id,
          },
          { withCredentials: true }
        );
        if (data.success) {
          toast.success(data.message);
          dispatch(setCartItems({}));
          dispatch(setCartCount(0));
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      } else {
        //placing order with stripe
        const { data } = await instance.post(
          "/api/order/stripe",
          {
            email: currentUser.email,
            items: cartArray.map((item) => ({
              product: item._id,
              quantity: item.quantity,
            })),
            address: selectedAddress._id,
          },
          { withCredentials: true }
        );
        if (data.success) {
          window.location.replace(data.url);
          dispatch(setCartItems({}));
          dispatch(setCartCount(0));
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getUserAddress();
    }
  }, [currentUser]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-16">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-[#4fbf8b]">{cartCount} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {currentUser &&
          cartArray.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
            >
              <div className="flex items-center md:gap-6 gap-3">
                <div
                  onClick={() => {
                    navigate(
                      `/product/${product.category.toLowerCase()}/${
                        product._id
                      }`
                    );
                    scrollTo(0, 0);
                  }}
                  className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
                >
                  <img
                    className="max-w-full h-full object-cover"
                    src={product.image[0]}
                    alt={product.name}
                  />
                </div>
                <div>
                  <p className="hidden md:block font-semibold">
                    {product.name}
                  </p>
                  <div className="font-normal text-gray-500/70">
                    <p>
                      Weight: <span>{product.weight || "N/A"}</span>
                    </p>
                    <div className="flex items-center">
                      <p>Qty:</p>
                      <select
                        onChange={(e) =>
                          dispatch(
                            updateCartItem({
                              itemId: product._id,
                              quantity: Number(e.target.value),
                            })
                          )
                        }
                        value={cartItems[product._id]}
                        className="outline-none"
                      >
                        {Array(
                          cartItems[product._id] > 9
                            ? cartItems[product._id]
                            : 9
                        )
                          .fill("")
                          .map((_, index) => (
                            <option key={index} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center">
                ${product.offerPrice * product.quantity}
              </p>
              <button
                onClick={() => dispatch(removeFromCart(product._id))}
                className="cursor-pointer mx-auto"
              >
                <img
                  src={assets.remove_icon}
                  alt="remove"
                  className="inline-block w-6 h-6"
                />
              </button>
            </div>
          ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-[#4fbf8b] font-medium"
        >
          <img
            src={assets.arrow_right_icon_colored}
            alt="arrow"
            className="group-hover:translate-x-1 transition"
          />
          Continue Shopping
        </button>
      </div>

      {/* Rigth section of our product cart */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street},${selectedAddress.city},${selectedAddress.state},${selectedAddress.country}`
                : "No Address Found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-[#4fbf8b] hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                {addresses.map((add, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(add);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100"
                  >
                    {add.street},{add.city},{add.state},{add.country}
                  </p>
                ))}
                <p
                  onClick={() => {
                    navigate("/add-address");
                  }}
                  className="text-[#4fbf8b] text-center cursor-pointer p-2 hover:bg-[#44ae7c]/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>${cartAmount}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${(cartAmount * 2) / 100}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>${cartAmount + (cartAmount * 2) / 100}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-[#4fbf8b] text-white font-medium hover:bg-[#44ae7c] transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to checkout"}
        </button>
      </div>
    </div>
  ) : null;
};
