import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useSelector } from "react-redux";

const UploadCategoryModel = ({ close, fetchData }) => {
    const allCategories = useSelector((state) => state.product.allCategory);
  const [data, setData] = useState({
    name: "",
    image: "",
    parentCategory: "",
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addCategory,
        data: data,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const response = await uploadImage(file);
    const { data: ImageResponse } = response;

    setData((prev) => ({
      ...prev,
      image: ImageResponse.data.url,
    }));
  };

 console.log(data, "data");

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-black dark:text-white">
            Create Category
          </h1>
          <button
            onClick={close}
            className="w-fit block ml-auto text-black dark:text-white"
          >
            <IoClose size={25} />
          </button>
        </div>

        <form className="my-3 grid gap-3" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="grid gap-1">
            <label
              htmlFor="categoryName"
              className="text-black dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="bg-blue-50 dark:bg-gray-700 text-black dark:text-white p-2 border border-blue-100 dark:border-gray-600 outline-none rounded"
            />
          </div>

          {/* Parent Category Dropdown */}
          <div className="grid gap-1">
            <label
              htmlFor="parentCategory"
              className="text-black dark:text-white"
            >
              Parent Category (optional)
            </label>
            <select
              id="parentCategory"
              name="parentCategory"
              value={data.parentCategory}
              onChange={handleOnChange}
              className="bg-blue-50 dark:bg-gray-700 text-black dark:text-white p-2 border border-blue-100 dark:border-gray-600 outline-none rounded"
            >
              <option value="">-- None --</option>
              {allCategories
                .filter((cat) => !cat.parentCategory) // only top-level
                .map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="grid gap-1">
            <label className="text-black dark:text-white">Image</label>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 dark:bg-gray-700 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {data.image ? (
                  <img
                    alt="category"
                    src={data.image}
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    No Image
                  </p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`
                ${
                  !data.name
                    ? "bg-gray-300 dark:bg-gray-600"
                    : "border-primary-200 dark:border-primary-600 hover:bg-primary-100 dark:hover:bg-primary-500"
                }
                px-4 py-2 rounded cursor-pointer border font-medium
              `}
                >
                  Upload Image
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className={`
          ${
            data.name && data.image
              ? "bg-primary-200 hover:bg-primary-100 dark:bg-primary-600 dark:hover:bg-primary-500"
              : "bg-gray-300 dark:bg-gray-600"
          }
          py-2 font-semibold rounded
        `}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
