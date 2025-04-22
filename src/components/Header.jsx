import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.webp'
import Search from './Search'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp  } from "react-icons/go";
import UserMenu from './UserMenu';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  // const { totalPrice, totalQty} = useGlobalContext()
  const [openCartSection, setOpenCartSection] = useState(false);

   const [isDarkMode, setIsDarkMode] = useState(() => {
     const stored = localStorage.getItem("darkMode");
     if (stored === null) {
       localStorage.setItem("darkMode", "true");
       return true; // default to dark mode
     }
     return stored === "true";
   });

   
  // Update the dark mode based on state
  useEffect(() => {
    if (isDarkMode) {
      console.log("dark mode");
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }

    navigate("/user");
  };

  // total item and total price
  useEffect(() => {
    const qty = cartItem.reduce((preve, curr) => {
      return preve + curr.quantity;
    }, 0);
    setTotalQty(qty);

    const tPrice = cartItem.reduce((preve, curr) => {
      return preve + curr.productId.price * curr.quantity;
    }, 0);
    setTotalPrice(tPrice);
  }, [cartItem]);

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-gray-900 text-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          {/**logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                width={170}
                height={60}
                alt="logo"
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={120}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>

          {/**Search */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/**login and my cart */}
          <div>
            {/**user icons display in only mobile version**/}
            <button
              className="text-neutral-300 lg:hidden"
              onClick={handleMobileUser}
            >
              <FaRegCircleUser size={26} />
            </button>

            {/**Desktop**/}
            <div className="hidden lg:flex items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((preve) => !preve)}
                    className="flex select-none items-center gap-1 cursor-pointer"
                  >
                    <p className="text-white">Account</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="bg-gray-300 dark:bg-gray-600 text-white font-medium rounded p-2 min-w-52 shadow-lg">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="text-lg px-2 text-neutral-300 hover:text-white"
                >
                  Login
                </button>
              )}

              <button
                onClick={() => setOpenCartSection(true)}
                className="flex items-center gap-2 bg-green-700 hover:bg-green-600 px-3 py-2 rounded text-white"
              >
                {/**add to cart icon */}
                <div className="animate-bounce">
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold text-sm text-white">
                  {cartItem[0] ? (
                    <div>
                      <p>{totalQty} Items</p>
                      <p>{DisplayPriceInRupees(totalPrice)}</p>
                    </div>
                  ) : (
                    <p>My Cart</p>
                  )}
                </div>
              </button>
              <button
                onClick={() => setIsDarkMode((prev) => !prev)}
                className="text-neutral-300 mr-4"
              >
                {isDarkMode ? "🌙" : "🌞"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>

      {openCartSection && (
        <DisplayCartItem close={() => setOpenCartSection(false)} />
      )}
    </header>
  );
}

export default Header
