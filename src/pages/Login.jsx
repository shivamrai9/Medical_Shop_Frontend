import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
                ...SummaryApi.login,
                data : data
            })

            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                localStorage.setItem('accesstoken',response.data.data.accesstoken)
                localStorage.setItem('refreshToken',response.data.data.refreshToken)
                

                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))

                setData({
                    email : "",
                    password : "",
                })
                navigate("/")
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }
    return (
      <section className="w-full container mx-auto px-2">
        <div className="bg-white dark:bg-gray-800 mb-4 w-full max-w-lg mx-auto rounded-lg p-7 shadow-lg dark:shadow-lg">
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

            <div className="grid gap-1">
              <label
                htmlFor="password"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Password :
              </label>
              <div className="bg-blue-50 dark:bg-gray-700 p-2 border rounded flex items-center focus-within:border-primary-200 dark:focus-within:border-primary-300">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full outline-none bg-transparent text-gray-800 dark:text-gray-100"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer text-gray-700 dark:text-gray-400"
                >
                  {showPassword ? (
                    <FaRegEye size={18} />
                  ) : (
                    <FaRegEyeSlash size={18} />
                  )}
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="block ml-auto text-sm text-primary-500 dark:text-white hover:text-primary-300 dark:hover:text-primary-200"
              >
                Forgot password?
              </Link>
            </div>

            <button
              disabled={!valideValue}
              className={`${
                valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
              } text-white py-2 rounded font-semibold my-3 tracking-wide transition duration-200 ease-in-out transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50`}
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
            >
              Register
            </Link>
          </p>
        </div>
      </section>
    );
}

export default Login

