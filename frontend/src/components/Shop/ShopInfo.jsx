import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../../server";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { FaMapMarkerAlt, FaPhone, FaBox, FaStar, FaCalendarAlt, FaHeart, FaUsers } from "react-icons/fa";

const ShopInfo = ({ isOwner }) => {
  const [data,setData] = useState({});
  const {products} = useSelector((state) => state.products);
  const [isLoading,setIsLoading] = useState(false);
  const {id} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios.get(`${server}/shop/get-shop-info/${id}`).then((res) => {
     setData(res.data.shop);
     setIsLoading(false);
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
    })
  }, [])
  

  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`,{
      withCredentials: true,
    });
    window.location.reload();
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings = products && products.reduce((acc,product) => acc + product.reviews.reduce((sum,review) => sum + review.rating, 0),0);

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
   <>
   {
    isLoading  ? (
      <Loader />
    ) : (
      <div className="space-y-6">
        {/* Shop Avatar & Name */}
        <div className="text-center">
          <div className="relative inline-block group">
            <div className="relative">
              <img
                src={`${data.avatar?.url}`}
                alt=""
                className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-4 mb-3">{data.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed px-2 line-clamp-3">
              {data.description}
            </p>
          </div>
        </div>

        {/* Shop Stats */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-5 border border-blue-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">Shop Statistics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center group">
              <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <FaBox className="text-blue-600 text-lg" />
              </div>
              <div className="text-2xl font-bold text-blue-600">{products && products.length}</div>
              <div className="text-xs text-gray-600">Products</div>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <FaStar className="text-green-600 text-lg" />
              </div>
              <div className="text-2xl font-bold text-green-600">{averageRating.toFixed(1)}</div>
              <div className="text-xs text-gray-600">Rating</div>
            </div>
          </div>
        </div>

        {/* Shop Details */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Contact Information</h4>
          
          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FaMapMarkerAlt className="text-red-500" />
            </div>
            <div className="min-w-0 flex-1">
              <h5 className="font-semibold text-gray-800 text-sm">Address</h5>
              <p className="text-gray-600 text-sm truncate">{data.address}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FaPhone className="text-blue-500" />
            </div>
            <div className="min-w-0 flex-1">
              <h5 className="font-semibold text-gray-800 text-sm">Phone</h5>
              <p className="text-gray-600 text-sm">{data.phoneNumber}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FaCalendarAlt className="text-purple-500" />
            </div>
            <div className="min-w-0 flex-1">
              <h5 className="font-semibold text-gray-800 text-sm">Member Since</h5>
              <p className="text-gray-600 text-sm">{data?.createdAt?.slice(0, 10)}</p>
            </div>
          </div>
        </div>

        {/* Owner Actions */}
        {isOwner && (
          <div className="space-y-3 pt-6 border-t border-gray-200">
            <Link to="/settings">
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Edit Shop
              </button>
            </Link>
            <button 
              onClick={logoutHandler}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    )
   }
   </>
  )
}

export default ShopInfo
