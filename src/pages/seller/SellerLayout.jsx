import { useDispatch, useSelector } from "react-redux";
import { assets } from "../../assets/assets";
import { Link, NavLink, Outlet } from "react-router-dom";
import { setIsSeller } from "../../redux/user/userSlice";

export const SellerLayout = () => {
  const { isSeller } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const dashboardicon = (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z"
      />
    </svg>
  );

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    dispatch(setIsSeller(false));
  };

  return (
    <div className="">
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to={"/"}>
          <img
            src={assets.logo}
            alt="logo"
            className="cursor-pointer w-34 md:w-38"
          />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-sm px-4 py-1"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex ">
        <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              end={item.path === "/seller"}
              key={item.name}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 
     ${
       isActive
         ? "border-r-4 md:border-r-[6px] bg-[#4fbf8b]/10 border-[#4fbf8b] text-[#4fbf8b]"
         : "hover:bg-gray-100/90 border-white"
     }`
              }
            >
              <img src={item.icon} className="w-7 h-7" alt="" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>
        {/* using this outlet we will display the child components in this component */}
        <Outlet />
      </div>
    </div>
  );
};
