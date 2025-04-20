import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleRight,FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/Wide_Assortment.png'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from '../components/AddToCartButton'
import Loading from '../components/Loading'

const ProductDisplayPage = () => {
  const params = useParams();
  const productId = params?.product?.split("-")?.slice(-1)[0];

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
        setSelectedImage(responseData.data.image?.[0]);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

const scrollLeft = () => {
  setScrollIndex((prev) => {
    const newIndex = Math.max(prev - 1, 0);
    setSelectedImage(data.image[newIndex]);
    return newIndex;
  });
};

const scrollRight = () => {
  if (data?.image) {
    setScrollIndex((prev) => {
      const newIndex = Math.min(prev + 1, data.image.length - 1);
      setSelectedImage(data.image[newIndex]);
      return newIndex;
    });
  }
};

useEffect(() => {
  if (data?.image?.[scrollIndex]) {
    setSelectedImage(data.image[scrollIndex]);
  }
}, [scrollIndex]);


  if (loading) return <Loading />;
  if (!data) return <div className="text-white p-4">Product not found.</div>;

  const originalPrice = Math.round(data.price / (1 - data.discount / 100));

  return (
    <div className="bg-gray-800 text-white min-h-screen p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Images */}
        <div className="w-full lg:w-1/2">
          <div className="relative border border-gray-700 rounded overflow-hidden mb-4 h-[400px] bg-black flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Selected"
              className="h-full object-contain"
            />
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              onClick={scrollLeft}
            >
              ◀
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              onClick={scrollRight}
            >
              ▶
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {data.image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`preview-${idx}`}
                className={`w-20 h-20 object-cover cursor-pointer border rounded ${
                  selectedImage === img ? "border-blue-400" : "border-gray-600"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Details and Features */}
        <div className="w-full lg:w-1/2 overflow-y-auto space-y-6">
          <h1 className="text-3xl font-semibold">{data.name}</h1>
          <p className="text-gray-300">{data.description}</p>
          <div className="flex items-center gap-4">
            <p className="text-2xl text-green-400 font-bold">₹{data.price}</p>
            <p className="text-lg line-through text-gray-500">
              ₹{originalPrice}
            </p>
            <span className="text-red-400 font-semibold">
              {data.discount}% off
            </span>
          </div>
          <div className="space-y-2 text-gray-300">
            <p>
              <span className="font-semibold text-white">Dosage:</span>{" "}
              {data.dosage}
            </p>
            <p>
              <span className="font-semibold text-white">Manufacturer:</span>{" "}
              {data.manufacturer}
            </p>
            <p>
              <span className="font-semibold text-white">Stock:</span>{" "}
              {data.stock}
            </p>
            <p>
              <span className="font-semibold text-white">Expiry:</span>{" "}
              {new Date(data.expiry_date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold text-white">
                Prescription Required:
              </span>{" "}
              {data.prescription_required ? "Yes" : "No"}
            </p>
          </div>
          <div className="pt-4">
            <AddToCartButton data={productId} />
          </div>

          {/* Medikit Features */}
          <div className="mt-8 bg-gray-800 rounded shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Why choose Medikit?</h2>
            <div className="space-y-4">
              {[
                {
                  text: "Certified and quality-checked medicines",
                  icon: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
                },
                {
                  text: "Fast home delivery nationwide",
                  icon: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
                },
                {
                  text: "Live chat with licensed pharmacists",
                  icon: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
                },
                {
                  text: "Secure payment and prescription uploads",
                  icon: "https://cdn-icons-png.flaticon.com/512/747/747376.png",
                },
                {
                  text: "Easy-to-use interface with order tracking",
                  icon: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img
                    src={item.icon}
                    alt="icon"
                    className="w-10 h-10 rounded-full object-cover bg-white p-1"
                  />
                  <p className="text-gray-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDisplayPage
