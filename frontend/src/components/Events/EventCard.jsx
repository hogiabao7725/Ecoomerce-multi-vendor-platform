import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  }
  
  return (
    <div className={`w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${
      active ? "unset" : "mb-8"
    }`}>
      <div className="lg:flex">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 relative overflow-hidden bg-gray-50">
          <img 
            src={`${data.images[0]?.url}`} 
            alt={data.name}
            className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          
          {/* Event Badge */}
          <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            EVENT
          </div>
          
          {/* Discount Badge */}
          {data.originalPrice > data.discountPrice && (
            <div className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              {Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)}% OFF
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3 leading-tight">
            {data.name}
          </h2>
          
          <p className="text-gray-600 text-base leading-relaxed mb-4">
            {data.description}
          </p>
          
          {/* Price Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <h5 className="text-2xl font-bold text-green-600">
                ${data.discountPrice}
              </h5>
              {data.originalPrice > data.discountPrice && (
                <h5 className="text-lg text-gray-500 line-through">
                  ${data.originalPrice}
                </h5>
              )}
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
              {data.sold_out || 0} sold
            </span>
          </div>
          
          {/* Countdown Timer */}
          <div className="mb-6">
            <CountDown data={data} />
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to={`/product/${data._id}?isEvent=true`}>
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
                See Details
              </button>
            </Link>
            <button 
              onClick={() => addToCartHandler(data)}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              Add to Cart
            </button>
          </div>
          
          {/* Stock Status */}
          <div className="mt-4">
            {data.stock > 0 ? (
              <span className="text-sm text-green-600 font-medium">
                In Stock ({data.stock} available)
              </span>
            ) : (
              <span className="text-sm text-red-600 font-medium">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
