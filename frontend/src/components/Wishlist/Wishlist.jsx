import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = {...data, qty:1};
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-black/50 h-screen z-10 backdrop-blur-sm">
      <div className="fixed top-0 right-0 h-full w-[90%] sm:w-[400px] bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AiOutlineHeart className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Wishlist</h2>
              <p className="text-sm text-gray-600">
                {wishlist && wishlist.length} {wishlist && wishlist.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpenWishlist(false)}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
          >
            <RxCross1 size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {wishlist && wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <AiOutlineHeart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-6">Start adding products you love to your wishlist</p>
              <button
                onClick={() => setOpenWishlist(false)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {wishlist &&
                wishlist.map((item, index) => (
                  <WishlistItem 
                    key={index} 
                    data={item} 
                    removeFromWishlistHandler={removeFromWishlistHandler} 
                    addToCartHandler={addToCartHandler} 
                  />
                ))}
            </div>
          )}
        </div>

        {/* Footer - Show only when there are items */}
        {wishlist && wishlist.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Total items:</span>
              <span className="font-semibold text-gray-900">{wishlist.length}</span>
            </div>
            <button
              onClick={() => setOpenWishlist(false)}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const WishlistItem = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex gap-3">
        {/* Product Image */}
        <div className="relative">
          <img
            src={`${data?.images[0]?.url}`}
            alt={data.name}
            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
          />
          <button
            onClick={() => removeFromWishlistHandler(data)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
          >
            <RxCross1 size={12} />
          </button>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm leading-tight mb-2 line-clamp-2">
            {data.name}
          </h3>
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-red-600">
              ${totalPrice.toFixed(2)}
            </span>
            {data.originalPrice && data.originalPrice > data.discountPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${data.originalPrice}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full ${data.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-xs ${data.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.stock > 0 ? `${data.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => addToCartHandler(data)}
              disabled={data.stock < 1}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <AiOutlineShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
