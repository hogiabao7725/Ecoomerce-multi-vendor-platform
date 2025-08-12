import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { server } from "../../server";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

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
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg =  totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);


  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full">
      {data ? (
        <div className="p-4 sm:p-6">
          <div className="w-full">
            <div className="block w-full lg:flex gap-6">
              {/* Left side - Product Images */}
              <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                <div className="mb-3">
                  <img
                    src={`${data && data.images[select]?.url}`}
                    alt={data.name}
                    className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        key={index}
                        className={`cursor-pointer border-2 rounded-lg overflow-hidden ${
                          select === index ? "border-blue-500" : "border-gray-200"
                        }`}
                      >
                        <img
                          src={`${i?.url}`}
                          alt=""
                          className="h-20 w-20 object-cover"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* Right side - Product Info */}
              <div className="w-full lg:w-1/2">
                <h1 className="text-2xl font-bold text-gray-800 mb-3">{data.name}</h1>
                <p className="text-gray-600 mb-4 leading-relaxed">{data.description}</p>
                
                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    ${data.discountPrice}
                  </span>
                  {data.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ${data.originalPrice}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    data.stock > 0 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {data.stock > 0 ? `${data.stock} in stock` : "Out of stock"}
                  </span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                      onClick={decrementCount}
                      disabled={count <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 bg-white text-gray-900 font-medium min-w-[50px] text-center">
                      {count}
                    </span>
                    <button
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
                    onClick={() => addToCartHandler(data._id)}
                    disabled={data.stock < 1}
                  >
                    <AiOutlineShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  
                  <button
                    className={`p-3 rounded-md border-2 transition-colors duration-200 ${
                      click 
                        ? "border-red-500 bg-red-50 text-red-600" 
                        : "border-gray-300 hover:border-gray-400 text-gray-600"
                    }`}
                    onClick={() => click ? removeFromWishlistHandler(data) : addToWishlistHandler(data)}
                    title={click ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {click ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
                  </button>
                </div>

                {/* Shop Information */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <img
                        src={`${data?.shop?.avatar?.url}`}
                        alt=""
                        className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/shop/preview/${data?.shop._id}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                          {data.shop.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600">Shop Rating: {averageRating}/5</p>
                    </div>
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center gap-2"
                      onClick={handleMessageSubmit}
                    >
                      <AiOutlineMessage className="w-4 h-4" />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      
      {/* Product Details Tabs */}
      {data && (
        <ProductDetailsInfo
          data={data}
          products={products}
          totalReviewsLength={totalReviewsLength}
          averageRating={averageRating}
        />
      )}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  const tabs = [
    { id: 1, name: "Product Details" },
    { id: 2, name: "Reviews" },
    { id: 3, name: "Seller Info" },
  ];

  return (
    <div className="bg-gray-100 px-4 py-6">
      {/* Tab Navigation */}
      <div className="flex justify-center space-x-1 bg-white rounded-lg p-2 shadow-sm mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
              active === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => setActive(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        {active === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {data.description}
            </p>
          </div>
        )}

        {active === 2 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Customer Reviews</h3>
            {data && data.reviews.length > 0 ? (
              <div className="space-y-4">
                {data.reviews.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-start gap-4">
                      <img
                        src={`${item.user.avatar?.url}`}
                        alt=""
                        className="w-10 h-10 rounded-full border-2 border-gray-200"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-gray-900">{item.user.name}</h4>
                          <Ratings rating={data?.ratings} />
                        </div>
                        <p className="text-gray-600">{item.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No reviews yet for this product.</p>
              </div>
            )}
          </div>
        )}

        {active === 3 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Seller Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Link to={`/shop/preview/${data.shop._id}`}>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <img
                      src={`${data?.shop?.avatar?.url}`}
                      className="w-16 h-16 rounded-full border-2 border-white shadow-sm"
                      alt=""
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                        {data.shop.name}
                      </h3>
                      <p className="text-sm text-gray-600">Rating: {averageRating}/5</p>
                    </div>
                  </div>
                </Link>
                <p className="mt-4 text-gray-600 leading-relaxed">{data.shop.description}</p>
              </div>
              
              <div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Shop Statistics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Joined:</span>
                      <span className="font-medium">{data.shop?.createdAt?.slice(0, 10)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Products:</span>
                      <span className="font-medium">{products && products.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reviews:</span>
                      <span className="font-medium">{totalReviewsLength}</span>
                    </div>
                  </div>
                  
                  <Link to="/" className="block mt-4">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                      Visit Shop
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
