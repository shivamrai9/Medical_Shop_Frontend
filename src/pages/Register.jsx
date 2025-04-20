import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",   
        mobile: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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

    
        if(data.password !== data.confirmPassword){
            toast.error(
                "password and confirm password must be same"
            )
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
              console.log(response.data);
                toast.success(response.data.message)
                setData({
                    name : "",
                    email : "",
                    password : "",
                    mobile : "",
                    confirmPassword : ""
                })
                // navigate("/login")
                console.log(data, "data");
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }
    return (
      <section className="w-full container mx-auto px-2">
        <div className="bg-white dark:bg-gray-800 mb-4 w-full max-w-lg mx-auto rounded-lg p-7 shadow-lg dark:shadow-lg">
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Welcome to Medikit
          </p>

          <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label
                htmlFor="name"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Name :
              </label>
              <input
                type="text"
                id="name"
                autoFocus
                className="bg-blue-50 dark:bg-gray-700 p-2 border rounded outline-none focus:border-primary-200 dark:focus:border-primary-300 text-gray-800 dark:text-gray-100"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="grid gap-1">
              <label
                htmlFor="mobile"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Mobile :
              </label>
              <input
                type="phone"
                id="mobile"
                className="bg-blue-50 dark:bg-gray-700 p-2 border rounded outline-none focus:border-primary-200 dark:focus:border-primary-300 text-gray-800 dark:text-gray-100"
                name="mobile"
                value={data.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
              />
            </div>

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
            </div>

            <div className="grid gap-1">
              <label
                htmlFor="confirmPassword"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Confirm Password :
              </label>
              <div className="bg-blue-50 dark:bg-gray-700 p-2 border rounded flex items-center focus-within:border-primary-200 dark:focus-within:border-primary-300">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full outline-none bg-transparent text-gray-800 dark:text-gray-100"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
                <div
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="cursor-pointer text-gray-700 dark:text-gray-400"
                >
                  {showConfirmPassword ? (
                    <FaRegEye size={18} />
                  ) : (
                    <FaRegEyeSlash size={18} />
                  )}
                </div>
              </div>
            </div>

            <button
              disabled={!valideValue}
              className={`${
                valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
              } text-white py-2 rounded font-semibold my-3 tracking-wide transition duration-200 ease-in-out transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50`}
            >
              Register
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

export default Register
