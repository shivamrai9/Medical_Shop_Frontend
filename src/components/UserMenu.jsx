import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout });
      if (response.data.success) {
        close?.();
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    close?.();
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-md shadow-lg w-full">
      <div className="font-semibold text-lg mb-2">My Account</div>

      <div className="text-sm flex items-center gap-2 mb-3">
        <span className="max-w-52 text-ellipsis overflow-hidden whitespace-nowrap font-medium">
          {user.name || user.mobile}
          {user.role === "ADMIN" && (
            <span className="text-xs text-red-500 ml-1">(Admin)</span>
          )}
        </span>
        <Link
          onClick={handleClose}
          to="/dashboard/profile"
          className="text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
        >
          <HiOutlineExternalLink size={16} />
        </Link>
      </div>

      <Divider className="dark:bg-gray-600 my-2" />

      <div className="text-sm grid gap-1">
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to="/dashboard/category"
            className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Category
          </Link>
        )}

        {/* Optional Subcategory Link */}
        {/* {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to="/dashboard/subcategory"
            className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Sub Category
          </Link>
        )} */}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to="/dashboard/upload-product"
            className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Upload Product
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to="/dashboard/product"
            className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Product
          </Link>
        )}

        <Link
          onClick={handleClose}
          to="/dashboard/myorders"
          className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          My Orders
        </Link>

        <Link
          onClick={handleClose}
          to="/dashboard/address"
          className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Save Address
        </Link>

        <button
          onClick={handleLogout}
          className="text-left px-2 py-1 rounded hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
