import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { setAllCategory,setAllSubCategory,setLoadingCategory } from './store/productSlice';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';
import { handleAddItemCart } from './store/cartProduct'
import GlobalProvider from './provider/GlobalProvider';
import { FaCartShopping } from "react-icons/fa6";
import CartMobileLink from './components/CartMobile';

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const fetchUser = async()=>{
      const userData = await fetchUserDetails()
      dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async()=>{
    try {
        dispatch(setLoadingCategory(true))
        const response = await Axios({
            ...SummaryApi.getCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        
    }finally{
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async()=>{
    try {
        const response = await Axios({
            ...SummaryApi.getSubCategory
        })
        const { data : responseData } = response.data
        const subCategories = responseData.filter((cat) => cat.parentCategory);
        if(responseData){
           dispatch(
             setAllSubCategory(
               subCategories
             )
           ); 
        }
    } catch (error) {
        
    }finally{
      dispatch(setLoadingCategory(false));
    }
  }


  const fetchCartItems = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem,
      });

      if (response.data.success) {
        dispatch(handleAddItemCart(response.data.data)); // assuming response.data.data is the cart array
      }
    } catch (error) {
      console.log("Error fetching cart items:", error);
    }
  };

  

  useEffect(()=>{
    
    fetchUser()
    fetchCategory()
    fetchSubCategory()
    fetchCartItems(); 

  },[])


  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[calc(100vh-160px)] dark:bg-gray-900  ">
        <div className='container mx-auto py-1 max-w-7xl'>
          <Outlet />
        </div>
      </main>
      <Footer />
      <Toaster />
      {location.pathname !== "/checkout" && <CartMobileLink />}
    </GlobalProvider>
  );
}

export default App
