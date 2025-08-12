import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlinePassword,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
 const {user} = useSelector((state) => state.user);
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const menuItems = [
    { id: 1, icon: <RxPerson size={20} />, label: "Profile" },
    { id: 2, icon: <HiOutlineShoppingBag size={20} />, label: "Orders" },
    { id: 3, icon: <HiOutlineReceiptRefund size={20} />, label: "Refunds" },
    { id: 4, icon: <AiOutlineMessage size={20} />, label: "Inbox" },
    { id: 5, icon: <MdOutlineTrackChanges size={20} />, label: "Track Order" },
    { id: 6, icon: <RiLockPasswordLine size={20} />, label: "Change Password" },
    { id: 7, icon: <TbAddressBook size={20} />, label: "Address" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 lg:p-6">
      {/* User Info Section */}
      <div className="text-center mb-6 lg:mb-8 pb-4 lg:pb-6 border-b border-gray-100">
        <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-3 lg:mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl lg:text-2xl font-bold shadow-lg">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <h3 className="font-semibold text-gray-800 text-base lg:text-lg mb-1">{user?.name || "User"}</h3>
        <p className="text-xs lg:text-sm text-gray-500 break-words">{user?.email}</p>
      </div>

      {/* Menu Items */}
      <div className="space-y-1 lg:space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl cursor-pointer transition-all duration-200 ${
              active === item.id
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            }`}
            onClick={() => item.id === 4 ? navigate("/inbox") : setActive(item.id)}
          >
            <div className={`${active === item.id ? "text-white" : "text-gray-500"}`}>
              {item.icon}
            </div>
            <span className="ml-3 font-medium text-sm lg:text-base">{item.label}</span>
          </div>
        ))}

        {/* Admin Dashboard */}
        {user && user?.role === "Admin" && (
          <Link to="/admin/dashboard">
            <div className="flex items-center px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl cursor-pointer transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800">
              <div className="text-gray-500">
                <MdOutlineAdminPanelSettings size={20} />
              </div>
              <span className="ml-3 font-medium text-sm lg:text-base">Admin Dashboard</span>
            </div>
          </Link>
        )}

        {/* Logout */}
        <div
          className="flex items-center px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl cursor-pointer transition-all duration-200 text-red-600 hover:bg-red-50 hover:text-red-700 mt-4 lg:mt-6 border-t border-gray-100 pt-4 lg:pt-6"
          onClick={logoutHandler}
        >
          <div className="text-red-500">
            <AiOutlineLogin size={20} />
          </div>
          <span className="ml-3 font-medium text-sm lg:text-base">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
