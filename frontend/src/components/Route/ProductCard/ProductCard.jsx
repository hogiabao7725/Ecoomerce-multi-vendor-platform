import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

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

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
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
  };

  return (
    <>
      <div className="group w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Image Container with Hover Effects */}
        <div className="relative overflow-hidden bg-gray-50">
          <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
            <img
              src={`${data.images && data.images[0]?.url}`}
              alt={data.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          
          {/* Hover Overlay with Action Buttons */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <div className="flex flex-col space-y-3">
                {/* Wishlist Button */}
                <button
                  onClick={() => click ? removeFromWishlistHandler(data) : addToWishlistHandler(data)}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors duration-200"
                  title={click ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {click ? (
                    <AiFillHeart size={18} className="text-red-500" />
                  ) : (
                    <AiOutlineHeart size={18} className="text-gray-600" />
                  )}
                </button>
                
                {/* Quick View Button */}
                <button
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-50 transition-colors duration-200"
                  title="Quick view"
                >
                  <AiOutlineEye size={18} className="text-gray-600" />
                </button>
                
                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCartHandler(data._id)}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-50 transition-colors duration-200"
                  title="Add to cart"
                >
                  <AiOutlineShoppingCart size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Discount Badge */}
          {data.originalPrice > data.discountPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-4">
          {/* Shop Name */}
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <h5 className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200">
              {data.shop.name}
            </h5>
          </Link>

          {/* Product Name */}
          <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
            <h4 className="text-base font-semibold text-gray-800 mt-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
              {data.name}
            </h4>
          </Link>

          {/* Ratings */}
          <div className="flex items-center mt-3">
            <Ratings rating={data?.ratings} />
            <span className="text-sm text-gray-500 ml-2">
              ({data?.ratings ? data.ratings.length : 0} reviews)
            </span>
          </div>

          {/* Price and Sold Info */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <h5 className="text-lg font-bold text-gray-900">
                ${data.discountPrice}
              </h5>
              {data.originalPrice > data.discountPrice && (
                <h4 className="text-sm text-gray-500 line-through">
                  ${data.originalPrice}
                </h4>
              )}
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              {data?.sold_out || 0} sold
            </span>
          </div>

          {/* Stock Status */}
          <div className="mt-3">
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

        {/* Quick View Modal */}
        {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
      </div>
    </>
  );
};

export default ProductCard;
