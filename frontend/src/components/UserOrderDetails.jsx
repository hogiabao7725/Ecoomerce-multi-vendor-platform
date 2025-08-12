import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { getAllOrdersOfUser } from "../redux/actions/order";
import { server } from "../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { HiLocationMarker, HiPhone, HiCreditCard, HiCalendar } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch,user._id]);

  const data = orders && orders.find((item) => item._id === id);

  const reviewHandler = async (e) => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  
  const refundHandler = async () => {
    await axios.put(`${server}/order/order-refund/${id}`,{
      status: "Processing refund"
    }).then((res) => {
       toast.success(res.data.message);
    dispatch(getAllOrdersOfUser(user._id));
    }).catch((error) => {
      toast.error(error.response.data.message);
    })
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Delivered": return "text-green-600 bg-green-100";
      case "Processing": return "text-blue-600 bg-blue-100";
      case "Processing refund": return "text-orange-600 bg-orange-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getPaymentStatusColor = (status) => {
    return status ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <BsFillBagFill size={24} className="text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
                <p className="text-gray-500 text-sm">Track your order information</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-gray-600">
                <HiCalendar className="w-5 h-5" />
                <span className="text-sm">Placed on {data?.createdAt?.slice(0, 10)}</span>
              </div>
            </div>
          </div>
          
          {/* Order ID */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">Order ID:</span>
              <span className="font-mono text-gray-900 bg-gray-100 px-3 py-1 rounded-md">
                #{data?._id?.slice(0, 8)}
              </span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
          {data &&
            data?.cart.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg mb-4 last:mb-0">
                <div className="flex-shrink-0">
                  <img
                    src={`${item.images[0]?.url}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                  <p className="text-gray-600">
                    US${item.discountPrice} × {item.qty}
                  </p>
                  <p className="text-sm text-gray-500">
                    Subtotal: US${(item.discountPrice * item.qty).toFixed(2)}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {!item.isReviewed && data?.status === "Delivered" ? (
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                      onClick={() => setOpen(true) || setSelectedItem(item)}
                    >
                      Write Review
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          
          {/* Total Price */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Total Amount:</span>
              <span className="text-2xl font-bold text-gray-900">US${data?.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Order Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              <HiLocationMarker className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
            </div>
            <div className="space-y-2 text-gray-700">
              <p className="font-medium">
                {data?.shippingAddress.address1 + " " + data?.shippingAddress.address2}
              </p>
              <p>{data?.shippingAddress.country}</p>
              <p>{data?.shippingAddress.city}</p>
              <div className="flex items-center space-x-2 pt-2">
                <HiPhone className="w-4 h-4 text-gray-500" />
                <span>{data?.user?.phoneNumber}</span>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              <HiCreditCard className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Payment Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(data?.paymentInfo?.status)}`}>
                  {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Order Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(data?.status)}`}>
                  {data?.status}
                </span>
              </div>
              {data?.status === "Delivered" && (
                <button
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 mt-3"
                  onClick={refundHandler}
                >
                  Request Refund
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Link to="/" className="block">
            <button className="w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>Send Message</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Review Popup */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Write a Review</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <RxCross1 size={24} />
                </button>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg mb-4">
                <img
                  src={`${selectedItem?.images[0]?.url}`}
                  alt={selectedItem?.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{selectedItem?.name}</h4>
                  <p className="text-gray-600 text-sm">
                    US${selectedItem?.discountPrice} × {selectedItem?.qty}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      onClick={() => setRating(i)}
                      className="focus:outline-none"
                    >
                      {rating >= i ? (
                        <AiFillStar
                          className="w-8 h-8 text-yellow-400 hover:text-yellow-500 transition-colors"
                        />
                      ) : (
                        <AiOutlineStar
                          className="w-8 h-8 text-gray-300 hover:text-yellow-400 transition-colors"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="How was your product? Share your experience..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              <button
                onClick={rating > 1 ? reviewHandler : null}
                disabled={rating <= 1}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  rating > 1
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrderDetails;
