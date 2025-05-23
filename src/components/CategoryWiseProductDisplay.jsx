import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const loadingCardNumber = new Array(6).fill(null);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: { categoryId:id },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 300;
  };

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 300;
  };

  const handleRedirectProductListpage = () => {
    const subcategory = subCategoryData.find(
      (sub) => sub?.parentCategory?._id === id
    );

    if (!subcategory) return "/";

    const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(
      subcategory.name
    )}-${subcategory._id}`;
    return url;
  };

  const redirectURL = handleRedirectProductListpage();

  return (
    <div className="w-full mt-6 bg-gray-200 dark:bg-gray-800 py-4">
      {/* Header */}
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 mb-4">
        <h3 className="font-semibold text-lg md:text-xl dark:text-gray-200">
          {name}
        </h3>
        <Link
          to={redirectURL}
          className="dark:text-gray-200 hover:text-blue-500 font-medium"
        >
          See All
        </Link>
      </div>

      {/* Scrollable Container */}
      <div className="relative container mx-auto ">
        <div
          ref={containerRef}
          className="flex gap-4  overflow-x-auto scroll-smooth scrollbar-none whitespace-nowrap"
        >
          {loading
            ? loadingCardNumber.map((_, index) => (
                <div
                  key={`loading-${index}`}
                  className="flex-shrink-0 w-[200px] sm:w-[220px]"
                >
                  <CardLoading />
                </div>
              ))
            : data.map((p, index) => (
                <CardProduct key={`${p._id}-card-${index}`} data={p} />
              ))}
        </div>

        {/* Scroll Arrows */}
        <div className="absolute inset-0  pointer-events-none hidden lg:flex justify-between items-center">
          <button
            onClick={handleScrollLeft}
            className="pointer-events-auto bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 shadow-lg p-2 h-[140px] text-lg rounded-e-lg"
          >
            <FaAngleLeft className="dark:text-white"/>
          </button>
          <button
            onClick={handleScrollRight}
            className="pointer-events-auto bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 shadow-lg p-2 h-[140px] text-lg rounded-s-lg"
          >
            <FaAngleRight className="dark:text-white"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
