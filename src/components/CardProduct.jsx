import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddToCartButton from './AddToCartButton'

const CardProduct = ({data}) => {
   const {
     _id,
     name,
     image,
     price,
     discount,
     manufacturer,
     dosage,
     stock,
     expiry_date,
   } = data;

   const finalPrice = price - (price * discount) / 100;
   const url = `/product/${valideURLConvert(name)}-${_id}`;

   return (
     <Link
       to={url}
       className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-white overflow-hidden shadow hover:shadow-2xl transition duration-300 cursor-pointer group"
     >
       {/* Product Image */}
       <div className="h-28 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
         <img
           src={image?.[0]}
           alt={name}
           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
         />
       </div>

       {/* Product Info */}
       <div className="p-4 space-y-2">
         <h2 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2">
           {name}
         </h2>

         {/* <p className="text-sm text-gray-500 dark:text-gray-400">
           Manufacturer: {manufacturer}
         </p>
         <p className="text-sm text-gray-500 dark:text-gray-400">
           Dosage: {dosage}
         </p> */}

         {/* Price Section */}
         <div className="flex items-center gap-2">
           <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
             ₹{finalPrice}
           </span>
           {discount > 0 && (
             <>
               <span className="text-sm line-through text-gray-400 dark:text-gray-600">
                 ₹{price}
               </span>
               <span className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                 {discount}% OFF
               </span>
             </>
           )}
         </div>

         <AddToCartButton data={data} />

         {/* Footer Info */}
         <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex justify-between">
           <span>Stock: {stock}</span>
           <span>Exp: {new Date(expiry_date).toLocaleDateString("en-IN")}</span>
         </div>
       </div>
     </Link>
   );
}

export default CardProduct
