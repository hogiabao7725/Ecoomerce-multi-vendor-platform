import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import Ratings from "../Products/Ratings";
import { getAllEventsShop } from "../../redux/actions/event";
import { FaBox, FaCalendarAlt, FaStar, FaSearch, FaPlus, FaCommentAlt } from "react-icons/fa";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch]);

  const [active, setActive] = useState(1);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  const tabs = [
    { id: 1, name: "Products", icon: FaBox, count: products?.length || 0, color: "blue" },
    { id: 2, name: "Events", icon: FaCalendarAlt, count: events?.length || 0, color: "green" },
    { id: 3, name: "Reviews", icon: FaStar, count: allReviews?.length || 0, color: "purple" }
  ];

  const getTabColor = (color, isActive) => {
    if (isActive) {
      const colors = {
        blue: "bg-blue-600 text-white shadow-lg shadow-blue-200",
        green: "bg-green-600 text-white shadow-lg shadow-green-200",
        purple: "bg-purple-600 text-white shadow-lg shadow-purple-200"
      };
      return colors[color];
    } else {
      const colors = {
        blue: "bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200",
        green: "bg-green-50 text-green-600 hover:bg-green-100 border-green-200",
        purple: "bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200"
      };
      return colors[color];
    }
  };

  return (
    <div className="w-full">
      {/* Header with Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="flex flex-wrap gap-3 mb-4 sm:mb-0">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 border ${
                  getTabColor(tab.color, active === tab.id)
                }`}
              >
                <IconComponent className="text-sm" />
                <span>{tab.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  active === tab.id ? "bg-white/20" : "bg-white/80"
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
        
        {isOwner && (
          <div className="flex-shrink-0">
            <Link to="/dashboard">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Go Dashboard
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Content Sections */}
      <div className="min-h-[400px]">
        {/* Products Tab */}
        {active === 1 && (
          <div>
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard data={product} key={index} isShop={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center">
                  <FaBox className="text-blue-400 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">No Products Yet</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  This shop hasn't added any products yet. Check back later for amazing items!
                </p>
                {isOwner && (
                  <Link to="/create-product">
                    <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2 mx-auto">
                      <FaPlus className="text-sm" />
                      <span>Add Your First Product</span>
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

        {/* Events Tab */}
        {active === 2 && (
          <div>
            {events && events.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {events.map((event, index) => (
                  <ProductCard
                    data={event}
                    key={index}
                    isShop={true}
                    isEvent={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center">
                  <FaCalendarAlt className="text-green-400 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">No Events Yet</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  This shop hasn't created any events yet. Stay tuned for exciting announcements!
                </p>
                {isOwner && (
                  <Link to="/create-event">
                    <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2 mx-auto">
                      <FaPlus className="text-sm" />
                      <span>Create Your First Event</span>
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {active === 3 && (
          <div>
            {allReviews && allReviews.length > 0 ? (
              <div className="space-y-6">
                {allReviews.map((review, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={review.user?.avatar?.url}
                          alt=""
                          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-3">
                          <h4 className="text-base font-semibold text-gray-800">
                            {review.user?.name}
                          </h4>
                          <Ratings rating={review.rating} />
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                          {review.comment}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <FaCommentAlt className="text-gray-400" />
                            <span>Verified Purchase</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-full flex items-center justify-center">
                  <FaStar className="text-purple-400 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">No Reviews Yet</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  This shop hasn't received any reviews yet. Be the first to share your experience!
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                  <FaSearch className="text-gray-400" />
                  <span>Reviews will appear here once customers start shopping</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopProfileData;
