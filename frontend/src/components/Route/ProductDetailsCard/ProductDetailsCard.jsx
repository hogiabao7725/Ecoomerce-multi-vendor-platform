import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl relative overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
            >
              <RxCross1 size={20} className="text-gray-600" />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Left Section - Product Images and Shop Info */}
              <div className="w-full lg:w-1/2 p-6 lg:p-8">
                {/* Main Product Image */}
                <div className="relative mb-6">
                  <img 
                    src={`${data.images && data.images[0]?.url}`} 
                    alt={data.name}
                    className="w-full h-80 lg:h-96 object-cover rounded-xl"
                  />
                  
                  {/* Discount Badge */}
                  {data.originalPrice > data.discountPrice && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>

                {/* Shop Information */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex items-center">
                    <img
                      src={`${data.images && data.images[0]?.url}`}
                      alt={data.shop.name}
                      className="w-12 h-12 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200">
                        {data.shop.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <AiOutlineStar className="text-yellow-400 mr-1" />
                        <span>{data?.ratings || 0} Ratings</span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Send Message Button */}
                <button
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center"
                  onClick={handleMessageSubmit}
                >
                  <AiOutlineMessage className="mr-2" />
                  Send Message
                </button>

                {/* Stock Status */}
                <div className="mt-4 text-center">
                  {data.stock > 0 ? (
                    <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-2 rounded-full">
                      In Stock ({data.stock} available)
                    </span>
                  ) : (
                    <span className="text-sm text-red-600 font-medium bg-red-50 px-3 py-2 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Right Section - Product Details */}
              <div className="w-full lg:w-1/2 p-6 lg:p-8 bg-gray-50">
                {/* Product Title and Wishlist */}
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 leading-tight pr-4">
                    {data.name}
                  </h1>
                  
                  {/* Wishlist Button */}
                  <button
                    onClick={() => click ? removeFromWishlistHandler(data) : addToWishlistHandler(data)}
                    className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
                    title={click ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {click ? (
                      <AiFillHeart size={24} className="text-red-500" />
                    ) : (
                      <AiOutlineHeart size={24} className="text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Product Description */}
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  {data.description}
                </p>

                {/* Price Section */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-3xl font-bold text-gray-900">
                      ${data.discountPrice}
                    </h2>
                    {data.originalPrice > data.discountPrice && (
                      <h3 className="text-xl text-gray-500 line-through">
                        ${data.originalPrice}
                      </h3>
                  )}
                  </div>
                  
                  {/* Savings Info */}
                  {data.originalPrice > data.discountPrice && (
                    <p className="text-sm text-green-600 font-medium">
                      Save ${(data.originalPrice - data.discountPrice).toFixed(2)}!
                    </p>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      className="w-12 h-12 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors duration-200 flex items-center justify-center"
                      onClick={decrementCount}
                      disabled={count <= 1}
                    >
                      -
                    </button>
                    <span className="w-16 h-12 bg-white border-2 border-gray-200 text-gray-800 font-semibold rounded-lg flex items-center justify-center">
                      {count}
                    </span>
                    <button
                      className="w-12 h-12 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors duration-200 flex items-center justify-center"
                      onClick={incrementCount}
                      disabled={count >= data.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center text-lg shadow-lg hover:shadow-xl"
                  onClick={() => addToCartHandler(data._id)}
                  disabled={data.stock < 1}
                >
                  <AiOutlineShoppingCart className="mr-2" size={20} />
                  Add to Cart
                </button>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">SKU:</span> {data._id?.slice(-8)}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span> {data.category || 'General'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
