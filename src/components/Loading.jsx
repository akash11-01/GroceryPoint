import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Loading() {
  const navigate = useNavigate();
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
        // navigate("/my-orders");
      }, 5000);
    }
  }, [nextUrl]);
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-[#4fbf8b]"></div>
    </div>
  );
}
