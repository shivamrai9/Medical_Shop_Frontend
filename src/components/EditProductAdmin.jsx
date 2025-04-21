import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import uploadImage from "../utils/UploadImage";
import successAlert from "../utils/SuccessAlert";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import AddFieldComponent from "../components/AddFieldComponent";

const EditProductAdmin = ({ close, data: propsData, fetchProductData }) => {
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const [data, setData] = useState({
    _id: propsData._id,
    name: propsData.name || "",
    image: propsData.image || [],
    category: propsData.category || [],
    subCategory: propsData.subCategory || [],
    dosage: propsData.dosage || "",
    stock: propsData.stock || "",
    price: propsData.price || "",
    discount: propsData.discount || "",
    description: propsData.description || "",
    more_details: propsData.more_details || {},
  });

  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageLoading(true);
    try {
      const { data: uploadRes } = await uploadImage(file);
      const imageUrl = uploadRes?.data?.url;

      setData((prev) => ({ ...prev, image: [...prev.image, imageUrl] }));
    } catch (err) {
      AxiosToastError(err);
    } finally {
      setImageLoading(false);
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...data.image];
    newImages.splice(index, 1);
    setData((prev) => ({ ...prev, image: newImages }));
  };

  const handleRemoveCategory = (index) => {
    const updated = [...data.category];
    updated.splice(index, 1);
    setData((prev) => ({ ...prev, category: updated }));
  };

  const handleRemoveSubCategory = (index) => {
    const updated = [...data.subCategory];
    updated.splice(index, 1);
    setData((prev) => ({ ...prev, subCategory: updated }));
  };

  const handleAddField = () => {
    if (!fieldName.trim()) return;
    setData((prev) => ({
      ...prev,
      more_details: { ...prev.more_details, [fieldName]: "" },
    }));
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.updateProductDetails,
        data,
      });

      if (response.data.success) {
        successAlert(response.data.message);
        close?.();
        fetchProductData?.();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed inset-0 z-50 bg-black bg-opacity-60 p-4">
      <div className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 w-full max-w-2xl mx-auto h-full max-h-[95vh] p-4 overflow-y-auto rounded shadow-md">
        <header className="flex items-center justify-between border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">Edit Product</h2>
          <button onClick={close}>
            <IoClose size={24} />
          </button>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <InputField
            label="Name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />

          {/* Description */}
          <TextareaField
            label="Description"
            name="description"
            value={data.description}
            onChange={handleChange}
          />

          {/* Image Upload */}
          <div>
            <p className="font-medium">Image</p>
            <label
              htmlFor="productImage"
              className="bg-blue-50 dark:bg-neutral-800 h-24 border rounded flex justify-center items-center cursor-pointer"
            >
              {imageLoading ? (
                <Loading />
              ) : (
                <div className="text-center">
                  <FaCloudUploadAlt size={30} className="mx-auto" />
                  <p>Upload Image</p>
                </div>
              )}
              <input
                type="file"
                id="productImage"
                className="hidden"
                accept="image/*"
                onChange={handleUploadImage}
              />
            </label>

            <div className="flex flex-wrap gap-2 mt-2">
              {data.image.map((img, index) => (
                <div
                  key={index}
                  className="relative h-20 w-20 border rounded bg-blue-50 dark:bg-neutral-800"
                >
                  <img
                    src={img}
                    alt="uploaded"
                    className="w-full h-full object-contain"
                    onClick={() => setViewImageURL(img)}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    className="absolute bottom-0 right-0 bg-red-600 p-1 text-white rounded hover:bg-red-700"
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <SelectList
            label="Category"
            options={allCategory}
            selected={selectCategory}
            onChange={(e) => {
              const value = e.target.value;
              const category = allCategory.find((cat) => cat._id === value);
              if (
                category &&
                !data.category.find((c) => c._id === category._id)
              ) {
                setData((prev) => ({
                  ...prev,
                  category: [...prev.category, category],
                }));
              }
              setSelectCategory("");
            }}
            mappedData={data.category}
            removeFn={handleRemoveCategory}
          />

          {/* SubCategory Selection */}
          <SelectList
            label="Sub Category"
            options={allSubCategory}
            selected={selectSubCategory}
            onChange={(e) => {
              const value = e.target.value;
              const sub = allSubCategory.find((cat) => cat._id === value);
              if (sub && !data.subCategory.find((c) => c._id === sub._id)) {
                setData((prev) => ({
                  ...prev,
                  subCategory: [...prev.subCategory, sub],
                }));
              }
              setSelectSubCategory("");
            }}
            mappedData={data.subCategory}
            removeFn={handleRemoveSubCategory}
          />

          {/* Unit, Stock, Price, Discount */}
          <InputField
            label="Dosage Unit"
            name="dosage"
            value={data.dosage}
            onChange={handleChange}
          />
          <InputField
            label="Stock"
            name="stock"
            value={data.stock}
            onChange={handleChange}
            type="number"
          />
          <InputField
            label="Price"
            name="price"
            value={data.price}
            onChange={handleChange}
            type="number"
          />
          <InputField
            label="Discount"
            name="discount"
            value={data.discount}
            onChange={handleChange}
            type="number"
          />

          {/* More Fields */}
          {Object.entries(data.more_details).map(([key, val], idx) => (
            <InputField
              key={key + idx}
              label={key}
              name={key}
              value={val}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  more_details: {
                    ...prev.more_details,
                    [key]: e.target.value,
                  },
                }))
              }
            />
          ))}

          <div
            className="bg-white dark:bg-neutral-800 text-center border w-32 rounded py-1 cursor-pointer hover:bg-primary-100"
            onClick={() => setOpenAddField(true)}
          >
            Add Fields
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-primary-100 hover:bg-primary-200 rounded font-semibold"
          >
            Update Product
          </button>
        </form>

        {/* Modals */}
        {viewImageURL && (
          <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />
        )}
        {openAddField && (
          <AddFieldComponent
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleAddField}
            close={() => setOpenAddField(false)}
          />
        )}
      </div>
    </section>
  );
};

export default EditProductAdmin;

// Reusable components:
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="grid gap-1">
    <label htmlFor={name} className="font-medium">
      {label}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="bg-blue-50 dark:bg-neutral-800 p-2 outline-none border rounded"
    />
  </div>
);

const TextareaField = ({ label, name, value, onChange }) => (
  <div className="grid gap-1">
    <label htmlFor={name} className="font-medium">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      required
      className="bg-blue-50 dark:bg-neutral-800 p-2 outline-none border rounded resize-none"
    />
  </div>
);

const SelectList = ({
  label,
  options,
  selected,
  onChange,
  mappedData,
  removeFn,
}) => (
  <div className="grid gap-1">
    <label className="font-medium">{label}</label>
    <select
      value={selected}
      onChange={onChange}
      className="bg-blue-50 dark:bg-neutral-800 p-2 border rounded w-full"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt._id} value={opt._id}>
          {opt.name}
        </option>
      ))}
    </select>
    <div className="flex flex-wrap gap-2 mt-1">
      {mappedData.map((item, index) => (
        <div
          key={item._id}
          className="flex items-center gap-1 text-sm bg-blue-100 dark:bg-neutral-700 px-2 py-1 rounded"
        >
          <span>{item.name}</span>
          <IoClose
            className="cursor-pointer hover:text-red-500"
            onClick={() => removeFn(index)}
          />
        </div>
      ))}
    </div>
  </div>
);
