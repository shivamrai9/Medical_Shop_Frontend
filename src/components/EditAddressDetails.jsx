import React from "react";
import { useForm } from "react-hook-form";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../provider/GlobalProvider";

const EditAddressDetails = ({ close, data }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      _id: data._id,
      userId: data.userId,
      address_line: data.address_line,
      city: data.city,
      state: data.state,
      country: data.country,
      pincode: data.pincode,
      mobile: data.mobile,
    },
  });
  const { fetchAddress } = useGlobalContext();

  const onSubmit = async (data) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateAddress,
        data: {
          ...data,
          address_line: data.address_line,
          city: data.city,
          state: data.state,
          country: data.country,
          pincode: data.pincode,
          mobile: data.mobile,
          delivery_instructions: "Please ring the bell once",
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (close) {
          close();
          reset();
          fetchAddress();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="bg-black/70 fixed top-0 left-0 right-0 bottom-0 z-50 h-screen overflow-auto">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 w-full max-w-lg mt-10 mx-auto rounded-lg shadow-lg dark:shadow-black">
        <div className="flex justify-between items-center border-b dark:border-gray-700 pb-3 mb-4">
          <h2 className="text-xl font-semibold">Edit Address</h2>
          <button
            onClick={close}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <IoClose size={25} />
          </button>
        </div>

        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          {[
            { id: "addressline", label: "Address Line", field: "address_line" },
            { id: "city", label: "City", field: "city" },
            { id: "state", label: "State", field: "state" },
            { id: "pincode", label: "Pincode", field: "pincode" },
            { id: "country", label: "Country", field: "country" },
            { id: "mobile", label: "Mobile No.", field: "mobile" },
          ].map(({ id, label, field }) => (
            <div key={id} className="grid gap-1">
              <label htmlFor={id} className="text-sm font-medium">
                {label}:
              </label>
              <input
                type="text"
                id={id}
                {...register(field, { required: true })}
                className="bg-blue-50 dark:bg-neutral-800 text-black dark:text-white border border-gray-300 dark:border-neutral-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-semibold py-2 rounded-md transition mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditAddressDetails;
