import React, { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem,fetchOrder } = useGlobalContext()
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  const [selectAddress, setSelectAddress] = useState(0)
  const cartItemsList = useSelector(state => state.cartItem.cart)
  const navigate = useNavigate()

  const handleCashOnDelivery = async() => {
      try {
          const response = await Axios({
            ...SummaryApi.CashOnDeliveryOrder,
            data : {
              list_items : cartItemsList,
              addressId : addressList[selectAddress]?._id,
              subTotalAmt : totalPrice,
              totalAmt :  totalPrice,
            }
          })
          const { data : responseData } = response

          if(responseData.success){
              toast.success(responseData.message)
              if(fetchCartItem){
                fetchCartItem()
              }
              if(fetchOrder){
                fetchOrder()
              }
              navigate('/success',{
                state : {
                  text : "Order"
                }
              })
          }

      } catch (error) {
        AxiosToastError(error)
      }
  }

  const handleOnlinePayment = async()=>{
    try {
        toast.loading("Loading...")
        const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
        const stripePromise = await loadStripe(stripePublicKey)
       
        const response = await Axios({
            ...SummaryApi.payment_url,
            data : {
              list_items : cartItemsList,
              addressId : addressList[selectAddress]?._id,
              subTotalAmt : totalPrice,
              totalAmt :  totalPrice,
            }
        })

        const { data : responseData } = response

        stripePromise.redirectToCheckout({ sessionId : responseData.id })
        
        if(fetchCartItem){
          fetchCartItem()
        }
        if(fetchOrder){
          fetchOrder()
        }
    } catch (error) {
        AxiosToastError(error)
    }
  }
  return (
    <section className="bg-blue-50 dark:bg-neutral-900">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between">
        {/* Address Section */}
        <div className="w-full">
          <h3 className="text-lg font-semibold dark:text-white">
            Choose your address
          </h3>
          <div className="bg-white dark:bg-neutral-800 p-2 grid gap-4 rounded">
            {addressList.map((address, index) => (
              <label
                htmlFor={"address" + index}
                key={index}
                className={!address.status ? "hidden" : ""}
              >
                <div className="border rounded p-3 flex gap-3 hover:bg-blue-50 dark:hover:bg-neutral-700">
                  <div>
                    <input
                      id={"address" + index}
                      type="radio"
                      value={index}
                      onChange={(e) => setSelectAddress(e.target.value)}
                      name="address"
                    />
                  </div>
                  <div className="text-sm dark:text-gray-200">
                    <p>{address.address_line}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>
                      {address.country} - {address.pincode}
                    </p>
                    <p>{address.mobile}</p>
                  </div>
                </div>
              </label>
            ))}

            <div
              onClick={() => setOpenAddress(true)}
              className="h-16 bg-blue-50 dark:bg-neutral-800 dark:text-white border-2 border-dashed dark:border-neutral-600 flex justify-center items-center cursor-pointer"
            >
              Add address
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-full max-w-md bg-white dark:bg-neutral-800 py-4 px-2 rounded">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Summary
          </h3>

          <div className="p-4 bg-white dark:bg-neutral-800 rounded">
            <h3 className="font-semibold mb-2 dark:text-white">Bill details</h3>

            <div className="flex gap-4 justify-between ml-1 text-sm dark:text-gray-200">
              <p>Items total</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-neutral-400">
                  {DisplayPriceInRupees(notDiscountTotalPrice)}
                </span>
                <span>{DisplayPriceInRupees(totalPrice)}</span>
              </p>
            </div>

            <div className="flex gap-4 justify-between ml-1 text-sm dark:text-gray-200">
              <p>Quantity total</p>
              <p>{totalQty} item</p>
            </div>

            <div className="flex gap-4 justify-between ml-1 text-sm dark:text-gray-200">
              <p>Delivery Charge</p>
              <p>Free</p>
            </div>

            <div className="font-semibold flex items-center justify-between gap-4 mt-3 dark:text-white">
              <p>Grand total</p>
              <p>{DisplayPriceInRupees(totalPrice)}</p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 mt-6">
            <button
              className="py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold transition-colors"
              onClick={handleOnlinePayment}
            >
              Online Payment
            </button>

            <button
              className="py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white dark:hover:text-white dark:border-green-500 dark:text-green-400"
              onClick={handleCashOnDelivery}
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
}

export default CheckoutPage
