import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import CofirmBox from "../components/CofirmBox";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const CategoryPage = () => {
  const [parentCategories, setParentCategories] = useState([]);
  const [expandedParentId, setExpandedParentId] = useState(null);
  const [subCategoriesMap, setSubCategoriesMap] = useState({});
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ name: "", image: "" });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({ _id: "" });

  useEffect(() => {
    fetchParentCategories();
  }, []);

  const fetchParentCategories = async () => {
    try {
      setLoadingSubcategories(true);
      const { data: responseData } = await Axios(SummaryApi.getCategory);

      if (responseData.success) {
        setParentCategories(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoadingSubcategories(false);
    }
  };

  const fetchSubCategories = async (parentId) => {
    try {
      setLoadingSubcategories(true);
      const { data: res } = await Axios(SummaryApi.getSubCategories(parentId));

      if (res.success) {
        setSubCategoriesMap((prev) => ({
          ...prev,
          [parentId]: res.data,
        }));
      }
    } catch (err) {
      AxiosToastError(err);
    } finally {
      setLoadingSubcategories(false);
    }
  };

  const handleAccordionToggle = (parentId) => {
    const isExpanded = expandedParentId === parentId;
    setExpandedParentId(isExpanded ? null : parentId);

    if (!isExpanded && !subCategoriesMap[parentId]) {
      fetchSubCategories(parentId);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const { data: responseData } = await Axios(
        SummaryApi.deleteCategory(deleteCategory._id));

      if (responseData.success) {
        toast.success(responseData.message);
        fetchParentCategories();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Manage Categories
        </h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
        >
          + Add Category
        </button>
      </div>

      {parentCategories.map((parent) => (
        <div
          key={parent._id}
          className="mb-4 border rounded shadow dark:bg-gray-800"
        >
          <div
            className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 cursor-pointer"
            onClick={() => handleAccordionToggle(parent._id)}
          >
            <div className="flex items-center gap-3">
              <img
                src={parent.image}
                alt={parent.name}
                className="w-10 h-10 object-cover rounded"
              />
              <span className="font-semibold text-black dark:text-white">
                {parent.name}
              </span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setEditData(parent);
                  setOpenEdit(true);
                }}
                className="text-sm text-blue-600 dark:text-blue-400"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setDeleteCategory({ _id: parent._id });
                  setOpenConfirmBoxDelete(true);
                }}
                className="text-sm text-red-600 dark:text-red-400"
              >
                Delete
              </button>
            </div>
          </div>

          {expandedParentId === parent._id && (
            <div className="bg-white dark:bg-gray-700 px-4 py-3">
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Subcategories:
              </h4>

              {loadingSubcategories ? (
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  Loading...
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {subCategoriesMap[parent._id]?.map((sub) => (
                    <div
                      key={sub._id}
                      className="p-2 border rounded shadow-sm flex flex-col items-center text-center dark:bg-gray-800"
                    >
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <p className="mt-2 font-medium text-black dark:text-white">
                        {sub.name}
                      </p>
                      <div className="space-x-1 mt-2">
                        <button
                          onClick={() => {
                            setEditData(sub);
                            setOpenEdit(true);
                          }}
                          className="text-xs text-blue-600 dark:text-blue-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteCategory({ _id: sub._id });
                            setOpenConfirmBoxDelete(true);
                          }}
                          className="text-xs text-red-500 dark:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                className="mt-3 text-sm text-blue-600 dark:text-blue-400"
                onClick={() => {
                  setOpenUploadCategory(true);
                }}
              >
                + Add Subcategory
              </button>
            </div>
          )}
        </div>
      ))}

      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchParentCategories}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      {openEdit && (
        <EditCategory
          close={() => setOpenEdit(false)}
          allCategories={parentCategories}
          data={editData}
          fetchData={fetchParentCategories}
        />
      )}

      {openConfirmBoxDelete && (
        <CofirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;
