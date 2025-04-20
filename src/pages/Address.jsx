import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddressDetails from '../components/EditAddressDetails';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider';

const Address = () => {
  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress,setOpenAddress] = useState(false)
  const [OpenEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({})
  const { fetchAddress} = useGlobalContext()

  const handleDisableAddress = async(id)=>{
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data : {
          _id : id
        }
      })
      if(response.data.success){
        toast.success("Address Remove")
        if(fetchAddress){
          fetchAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white shadow-lg px-2 py-2 flex justify-between gap-4 items-center">
        <h2 className="font-semibold text-ellipsis line-clamp-1">Address</h2>
        <button
          onClick={() => setOpenAddress(true)}
          className="border border-primary-200 dark:border-primary-500 text-primary-200 dark:text-primary-500 px-3 hover:bg-primary-200 hover:text-black py-1 rounded-full"
        >
          Add Address
        </button>
      </div>

      <div className="bg-blue-50 dark:bg-gray-800 p-2 grid gap-4">
        {addressList.map((address, index) => {
          return (
            <div
              className={`border rounded p-3 flex gap-3 bg-white dark:bg-gray-700 ${
                !address.status && "hidden"
              }`}
            >
              <div className="w-full">
                <p className="text-black dark:text-white">
                  {address.address_line}
                </p>
                <p className="text-black dark:text-white">{address.city}</p>
                <p className="text-black dark:text-white">{address.state}</p>
                <p className="text-black dark:text-white">
                  {address.country} - {address.pincode}
                </p>
                <p className="text-black dark:text-white">{address.mobile}</p>
              </div>
              <div className="grid gap-10">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(address);
                  }}
                  className="bg-green-200 dark:bg-green-700 p-1 rounded hover:text-white hover:bg-green-600"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDisableAddress(address._id)}
                  className="bg-red-200 dark:bg-red-700 p-1 rounded hover:text-white hover:bg-red-600"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          );
        })}

        <div
          onClick={() => setOpenAddress(true)}
          className="h-16 bg-blue-50 dark:bg-gray-800 border-2 border-dashed flex justify-center items-center cursor-pointer text-white"
        >
          Add address
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}

      {OpenEdit && (
        <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />
      )}
    </>
  );
}

export default Address
