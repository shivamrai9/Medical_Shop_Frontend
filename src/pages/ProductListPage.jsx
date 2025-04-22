import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const { categoryId, subCategoryId, subCategoryName } = useParams();
  const AllSubCategory = useSelector((state) => state.product.allSubCategory);
  const [DisplaySubCatory, setDisplaySubCategory] = useState([]);

  const fetchProductdata = async () => {
    try {
      setLoading(true);
      let response;

      if (subCategoryId) {
        response = await Axios({
          ...SummaryApi.getProductsBySubCategory,
          data: {
            subCategoryId,
            page,
            limit: 8,
          },
        });
      } else if (categoryId) {
        response = await Axios({
          ...SummaryApi.getProductByCategory,
          data: {
            categoryId,
            page,
            limit: 8,
          },
        });
      }

      const { data: responseData } = response;

      if (responseData.success) {
        setData(
          page === 1 ? responseData.data : [...data, ...responseData.data]
        );
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductdata();
  }, [categoryId, subCategoryId, page]);

  useEffect(() => {
    const sub = AllSubCategory.filter(
      (s) => s?.parentCategory?._id === categoryId
    );
    setDisplaySubCategory(sub);
  }, [categoryId, AllSubCategory]);

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
        {/* Subcategories */}
        <div className="min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-1 shadow-md scrollbarCustom bg-white py-2">
          {DisplaySubCatory.map((s, index) => {
            const link = `/category/${s?.parentCategory?._id}/${s._id}`;
            return (
              <Link
                key={s._id}
                to={link}
                className={`w-full p-2 lg:flex items-center lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer ${
                    subCategoryId === s._id ? "bg-green-100" : ""
                  }`}
              >
                <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded">
                  <img
                    src={s.image}
                    alt="subCategory"
                    className="w-14 lg:w-12 h-full object-scale-down"
                  />
                </div>
                <p className="text-xs text-center lg:text-left lg:text-base">
                  {s.name}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Product List */}
        <div>
          <div className="bg-gray-200 dark:bg-gray-900 shadow-md p-4 z-10">
            <h3 className="font-semibold capitalize dark:text-white">
              {subCategoryName?.replace(/-/g, " ") || "Products"}
            </h3>
          </div>
          <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
              {data.map((p, index) => (
                <CardProduct
                  data={p}
                  key={p._id + "productSubCategory" + index}
                />
              ))}
            </div>
            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
