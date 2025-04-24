import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import ViewImage from "../components/ViewImage";
import AddFieldComponent from "../components/AddFieldComponent";
import Loading from "../components/Loading";
import Axios from "../utils/Axios";
import successAlert from "../utils/SuccessAlert";
import AxiosToastError from "../utils/AxiosToastError";

const initialState = {
  name: "",
  description: "",
  category: [],
  subCategory: [],
  price: "",
  stock: "",
  dosage: "",
  manufacturer: "",
  discount: "",
  prescription_required: false,
  expiry_date: "",
  publish: true,
  createdBy: "652e20bae2a72a6e7aaec003",
  more_details: {},
};

const UploadProduct = () => {
  const [data, setData] = useState(initialState);
  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageSelect = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected]);
    setImagePreview((prev) => [
      ...prev,
      ...selected.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleDeleteImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddField = () => {
    if (fieldName.trim()) {
      setData((prev) => ({
        ...prev,
        more_details: { ...prev.more_details, [fieldName]: "" },
      }));
      setFieldName("");
      setOpenAddField(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      for (const key in data) {
        if (["category", "subCategory"].includes(key)) {
          formData.append(key, JSON.stringify(data[key].map((i) => i._id)));
        } else if (key === "more_details") {
          for (const detail in data.more_details) {
            formData.append(
              `more_details[${detail}]`,
              data.more_details[detail]
            );
          }
        } else {
          formData.append(key, data[key]);
        }
      }

      files.forEach((file) => formData.append("images", file));

      const res = await Axios({
        method: "POST",
        url: "/api/product/create",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        successAlert(res.data.message);
        setData(initialState);
        setFiles([]);
        setImagePreview([]);
      }
    } catch (err) {
      AxiosToastError(err);
    }
  };

  const handleRemoveItem = (type, index) => {
    setData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  return (
    <section className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 shadow-md flex items-center justify-between">
        <h2 className="font-semibold text-lg">Upload Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 p-4">
        <Input
          label="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
        />
        <TextArea
          label="Description"
          name="description"
          value={data.description}
          onChange={handleChange}
        />

        {/* Image Upload */}
        <div>
          <label className="font-medium">Images</label>
          <label
            htmlFor="image"
            className="bg-gray-100 dark:bg-gray-700 h-24 border rounded flex justify-center items-center cursor-pointer"
          >
            <div className="text-center">
              {imageLoading ? (
                <Loading />
              ) : (
                <>
                  <FaCloudUploadAlt size={30} />
                  <p>Upload Image</p>
                </>
              )}
            </div>
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              id="image"
              onChange={handleImageSelect}
            />
          </label>

          <div className="flex flex-wrap gap-2 mt-2">
            {imagePreview.map((url, idx) => (
              <div
                key={idx}
                className="relative h-20 w-20 border bg-gray-100 dark:bg-gray-700 group"
              >
                <img
                  src={url}
                  alt="preview"
                  className="h-full w-full object-cover"
                  onClick={() => setViewImageURL(url)}
                />
                <div
                  className="absolute right-0 bottom-0 p-1 bg-red-500 text-white rounded cursor-pointer hidden group-hover:block"
                  onClick={() => handleDeleteImage(idx)}
                >
                  <MdDelete />
                </div>
              </div>
            ))}
          </div>
        </div>

        <CategorySelector
          label="Category"
          options={allCategory}
          selected={data.category}
          setSelected={(item) =>
            setData((prev) => ({ ...prev, category: [...prev.category, item] }))
          }
          removeItem={(i) => handleRemoveItem("category", i)}
        />
        <CategorySelector
          label="Sub Category"
          options={allSubCategory}
          selected={data.subCategory}
          setSelected={(item) =>
            setData((prev) => ({
              ...prev,
              subCategory: [...prev.subCategory, item],
            }))
          }
          removeItem={(i) => handleRemoveItem("subCategory", i)}
        />

        <Input
          label="Dosage (Unit)"
          name="dosage"
          value={data.dosage}
          onChange={handleChange}
          required
        />
        <Input
          label="Manufacturer"
          name="manufacturer"
          value={data.manufacturer}
          onChange={handleChange}
        />
        <Input
          label="Price"
          name="price"
          type="number"
          value={data.price}
          onChange={handleChange}
          required
        />
        <Input
          label="Stock"
          name="stock"
          type="number"
          value={data.stock}
          onChange={handleChange}
          required
        />
        <Input
          label="Discount (%)"
          name="discount"
          type="number"
          value={data.discount}
          onChange={handleChange}
        />
        <Input
          label="Expiry Date"
          name="expiry_date"
          type="date"
          value={data.expiry_date}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="prescription_required"
            checked={data.prescription_required}
            onChange={handleChange}
          />
          Prescription Required
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="publish"
            checked={data.publish}
            onChange={handleChange}
          />
          Publish
        </label>

        {Object.keys(data.more_details).map((key) => (
          <Input
            key={key}
            label={key}
            name={key}
            value={data.more_details[key]}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                more_details: { ...prev.more_details, [key]: e.target.value },
              }))
            }
          />
        ))}

        <button className="bg-blue-600 text-white hover:bg-blue-700 py-2 rounded font-semibold">
          Submit
        </button>
      </form>

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
    </section>
  );
};

const Input = ({ label, ...props }) => (
  <div className="grid gap-1">
    <label htmlFor={props.name} className="font-medium">
      {label}
    </label>
    <input
      {...props}
      className="bg-gray-100 dark:bg-gray-700 p-2 border rounded outline-none"
    />
  </div>
);

const TextArea = ({ label, ...props }) => (
  <div className="grid gap-1">
    <label htmlFor={props.name} className="font-medium">
      {label}
    </label>
    <textarea
      {...props}
      rows={3}
      className="bg-gray-100 dark:bg-gray-700 p-2 border rounded outline-none resize-none"
    />
  </div>
);

const CategorySelector = ({
  label,
  options,
  selected,
  setSelected,
  removeItem,
}) => {
  const [value, setValue] = useState("");
  return (
    <div className="grid gap-1">
      <label className="font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => {
          const selectedOption = options.find(
            (opt) => opt._id === e.target.value
          );
          if (selectedOption) setSelected(selectedOption);
          setValue("");
        }}
        className="bg-gray-100 dark:bg-gray-700 border p-2 rounded"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt._id} value={opt._id}>
            {opt.name}
          </option>
        ))}
      </select>

      <div className="flex flex-wrap gap-2 mt-2">
        {selected.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded"
          >
            <span>{item.name}</span>
            <IoClose
              size={16}
              className="text-red-500 cursor-pointer"
              onClick={() => removeItem(idx)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadProduct;
