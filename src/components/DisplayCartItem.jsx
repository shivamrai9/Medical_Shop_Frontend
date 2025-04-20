import React from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import imageEmpty from "../assets/empty_cart.webp";
import toast from "react-hot-toast";

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  console.log(cartItem, "cartItem");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      navigate("/checkout");
      if (close) {
        close();
      }
      return;
    }
    toast("Please Login");
  };
  return (
    <section className="bg-gray-800 bg-opacity-70 fixed top-0 bottom-0 right-0 left-0 z-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-sm min-h-screen ml-auto text-black dark:text-white rounded-lg shadow-lg dark:shadow-black">
        <div className="flex items-center p-4 shadow-md gap-3 justify-between dark:shadow-black">
          <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
            Cart
          </h2>
          <Link to={"/"} className="lg:hidden text-gray-800 dark:text-white">
            <IoClose size={25} />
          </Link>
          <button
            onClick={close}
            className="hidden lg:block text-gray-800 dark:text-white"
          >
            <IoClose size={25} />
          </button>
        </div>

        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 dark:bg-gray-900 p-2 flex flex-col gap-4">
          {cartItem[0] ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 bg-blue-100 dark:bg-gray-700 text-lg font-semibold text-yellow-500 dark:text-blue-400 rounded-full">
                <p>Your total savings</p>
                <p>
                  {DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 grid gap-5 overflow-auto">
                {cartItem.map((item, index) => (
                  <div
                    key={item?._id + "cartItemDisplay"}
                    className="flex w-full gap-4 items-center border-b dark:border-gray-700 pb-4"
                  >
                    <div className="w-16 h-16 min-h-16 min-w-16 border rounded bg-white dark:bg-gray-700">
                      <img
                        src={item?.productId?.image[0]}
                        className="object-scale-down w-full h-full"
                        alt="product-img"
                      />
                    </div>
                    <div className="w-full max-w-sm text-xs">
                      <p className="text-xs text-ellipsis line-clamp-2 text-gray-800 dark:text-gray-100">
                        {item?.productId?.name}
                      </p>
                      <p className="text-gray-400 dark:text-gray-300">
                        {item?.productId?.unit}
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {DisplayPriceInRupees(
                          pricewithDiscount(
                            item?.productId?.price,
                            item?.productId?.discount
                          )
                        )}
                      </p>
                    </div>
                    <div>
                      <AddToCartButton data={item?.productId} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white dark:bg-gray-800 p-4">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Bill details
                </h3>
                <div className="flex gap-4 justify-between ml-1 text-gray-800 dark:text-white">
                  <p>Items total</p>
                  <p className="flex items-center gap-2">
                    <span className="line-through text-gray-400 dark:text-gray-300">
                      {DisplayPriceInRupees(notDiscountTotalPrice)}
                    </span>
                    <span>{DisplayPriceInRupees(totalPrice)}</span>
                  </p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Quantity total</p>
                  <p>{totalQty} item</p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Delivery Charge</p>
                  <p>Free</p>
                </div>
                <div className="font-semibold flex items-center justify-between gap-4">
                  <p>Grand total</p>
                  <p>{DisplayPriceInRupees(totalPrice)}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white dark:bg-gray-800 flex flex-col justify-center items-center p-4">
              <img
                src={imageEmpty}
                className="w-full h-full object-scale-down"
                alt="Empty cart"
              />
              <Link
                onClick={close}
                to={"/"}
                className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded transition duration-200"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>

        {cartItem[0] && (
          <div className="p-2">
            <div className="bg-green-700 text-gray-100 px-4 font-bold text-base py-4 rounded flex items-center gap-4 justify-between">
              <div>{DisplayPriceInRupees(totalPrice)}</div>
              <button
                onClick={redirectToCheckoutPage}
                className="flex items-center gap-1 text-white"
              >
                Proceed
                <span>
                  <FaCaretRight />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItem;
