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
       className="flex-shrink-0 w-[350px] sm:w-[220px] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
     >
       {/* Image Section */}
       <div className="h-32 sm:h-36 bg-gray-100 dark:bg-gray-800 overflow-hidden">
         <img
           src={image?.[0]}
           alt={name}
           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
         />
       </div>

       {/* Info Section */}
       <div className="p-3 space-y-2">
         <h2 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-2 leading-snug">
           {name}
         </h2>

         {/* Price Section */}
         <div className="flex items-center gap-2">
           <span className="text-base font-bold text-blue-600 dark:text-blue-400">
             ₹ {finalPrice}
           </span>
           {discount > 0 && (
             <>
               <span className="text-xs line-through text-gray-400 dark:text-gray-50 font-normal">
                 ₹{price}
               </span>
               <span className="text-xs font-normal bg-green-200 dark:bg-green-600 text-green-800 dark:text-green-100 px-1.5 py-0.5 rounded-full">
                 {discount}% OFF
               </span>
             </>
           )}
         </div>

         {/* Add to Cart */}
         <AddToCartButton data={data} />

         {/* Stock and Expiry */}
         <div className="text-[12px] font-semibold  dark:text-gray-400 mt-2 flex justify-between">
           <span>Stock: {stock}</span>
           <span>Exp: {new Date(expiry_date).toLocaleDateString("en-IN")}</span>
         </div>
       </div>
     </Link>
   );
}

export default CardProduct
