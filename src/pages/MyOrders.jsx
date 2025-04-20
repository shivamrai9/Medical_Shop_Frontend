import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)

  if (!orders.length) {
    return <NoData />;
  }
  console.log("order Items",orders) 
  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6">
      <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">
        My Orders
      </h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="flex flex-col md:flex-row items-start gap-4 bg-gray-50 dark:bg-gray-800/60 p-5 rounded-xl shadow-sm transition hover:shadow-md"
        >
          {/* Thumbnail */}
          <div className="flex-shrink-0 w-28 h-28 overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
            <img
              src={order.product_details.image[0]}
              alt={order.product_details.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Section */}
          <div className="flex flex-col gap-2 flex-grow text-sm">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {order.product_details.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Order ID:{" "}
                <span className="text-gray-800 dark:text-gray-100 font-semibold">
                  {order.orderId}
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Date:{" "}
                <span className="text-gray-800 dark:text-gray-100 font-semibold">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>

            {/* Status Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  order.payment_status === "Pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {order.payment_status}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  order.delivery_status === "Processing"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {order.delivery_status}
              </span>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-auto">
                ₹{order.totalAmt}
              </span>
            </div>

            {/* Address */}
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-snug mt-2 font-medium">
              <p>
                {order.delivery_address.address_line},{" "}
                {order.delivery_address.city}
              </p>
              <p>
                {order.delivery_address.state} -{" "}
                {order.delivery_address.pincode}
              </p>
              <p>Mobile: {order.delivery_address.mobile}</p>
              {order.delivery_address.delivery_instructions && (
                <p className="italic mt-1 text-gray-500 dark:text-gray-400 text-xs">
                  {order.delivery_address.delivery_instructions}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrders
