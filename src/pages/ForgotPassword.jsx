import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [data, setData] = useState({
        email: "",
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)


    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                navigate("/verification-otp",{
                  state : data
                })
                setData({
                    email : "",
                })
                
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }

    return (
      <section className="w-full container mx-auto px-2">
        <div className="bg-white dark:bg-gray-800 mb-4 w-full max-w-lg mx-auto rounded-lg p-7 shadow-lg dark:shadow-lg">
          <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            Forgot Password
          </p>

          <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label
                htmlFor="email"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Email :
              </label>
              <input
                type="email"
                id="email"
                className="bg-blue-50 dark:bg-gray-700 p-2 border rounded outline-none focus:border-primary-200 dark:focus:border-primary-300 text-gray-800 dark:text-gray-100"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <button
              disabled={!valideValue}
              className={`${
                valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
              } text-white py-2 rounded font-semibold my-3 tracking-wide transition duration-200 ease-in-out transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50`}
            >
              Send OTP
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    );
}

export default ForgotPassword


