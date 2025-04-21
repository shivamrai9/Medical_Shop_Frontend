import React from 'react'
import banner from '../assets/banner1.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import HeroSlider from '../components/HeroSlider'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

const valideURLConvert = (name) => {
  return name
    ?.toString()
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll(",", "-")
    .replaceAll("&", "-");
};


 const handleRedirectProductListpage = (id, name) => {
   const slug = valideURLConvert(name);
   const url = `/products/${id}`;
   console.log("Navigating to:", url);
   navigate(url);
 };




  return (
    <section className="bg-white dark:bg-gray-900">
      
      <HeroSlider />

      <div className="container mx-auto px-4 my-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
        {loadingCategory
          ? new Array(12).fill(null).map((_, index) => (
              <div
                key={`loadingcategory-${index}`}
                className="flex flex-col items-center gap-2 animate-pulse"
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-700"></div>
                <div className="w-16 h-4 rounded bg-blue-100 dark:bg-blue-700"></div>
              </div>
            ))
          : categoryData.map((cat) => (
              <div
                key={`displayCategory-${cat._id}`}
                className="flex flex-col items-center cursor-pointer transition duration-300 hover:scale-105"
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
              >
                {/* Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 shadow-sm bg-white dark:bg-gray-900">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <p className="mt-2 text-sm text-center text-gray-800 dark:text-white line-clamp-2">
                  {cat.name}
                </p>
              </div>
            ))}
      </div>

      {/*** Display category product */}
      {categoryData?.map((c, index) => {
        return (
          <CategoryWiseProductDisplay
            key={c?._id + "CategorywiseProduct"}
            id={c?._id}
            name={c?.name}
          />
        );
      })}
    </section>
  );
}

export default Home
