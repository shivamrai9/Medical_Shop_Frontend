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
    <div className="bg-gray-900 text-gray-200 dark:bg-gray-800 dark:text-gray-100 p-3 rounded-md shadow-lg w-full">
      <div className="font-semibold text-white dark:text-gray-200 mb-1">
        My Account
      </div>
      <div className="text-sm flex items-center gap-2 mb-3">
        <span className="max-w-52 text-ellipsis overflow-hidden whitespace-nowrap">
          {user.name || user.mobile}
          <span className="text-sm text-red-500 ml-1">
            {user.role === "ADMIN" ? "(Admin)" : ""}
          </span>
        </span>
        <Link
          onClick={handleClose}
          to="/dashboard/profile"
          className="hover:text-blue-400 dark:hover:text-blue-300"
        >
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>

      <Divider className="bg-gray-700 dark:bg-gray-600" />

      <div className="text-sm grid gap-1 mt-2">
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to="/dashboard/category"
            className="px-2 py-1 rounded hover:bg-gray-800 dark:hover:bg-gray-600"
          >
            Category
          </Link>
        )}

        {/* Optional Subcategory link */}
        {/* {isAdmin(user.role) && (
      <Link
        onClick={handleClose}
        to="/dashboard/subcategory"
        className="px-2 py-1 rounded hover:bg-gray-800 dark:hover:bg-gray-600"
      >
        Sub Category
      </Link>
    )} */}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to="/dashboard/upload-product"
            className="px-2 py-1 rounded hover:bg-gray-800 dark:hover:bg-gray-600"
          >
            Upload Product
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to="/dashboard/product"
            className="px-2 py-1 rounded hover:bg-gray-800 dark:hover:bg-gray-600"
          >
            Product
          </Link>
        )}

        <Link
          onClick={handleClose}
          to="/dashboard/myorders"
          className="px-2 py-1 rounded hover:bg-gray-800 dark:hover:bg-gray-600"
        >
          My Orders
        </Link>

        <Link
          onClick={handleClose}
          to="/dashboard/address"
          className="px-2 py-1 rounded hover:bg-gray-800 dark:hover:bg-gray-600"
        >
          Save Address
        </Link>

        <button
          onClick={handleLogout}
          className="text-left px-2 py-1 rounded hover:bg-red-700 hover:text-white dark:hover:bg-red-600 dark:hover:text-gray-200 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
