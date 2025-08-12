import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { AiOutlineShoppingCart, AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black/50 h-screen z-10 backdrop-blur-sm">
      <div className="fixed top-0 right-0 h-full w-[90%] sm:w-[450px] bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <IoBagHandleOutline className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
              <p className="text-sm text-gray-600">
                {cart && cart.length} {cart && cart.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpenCart(false)}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
          >
            <RxCross1 size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {cart && cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <IoBagHandleOutline className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some products to your cart to get started</p>
              <button
                onClick={() => setOpenCart(false)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {cart &&
                cart.map((item, index) => (
                  <CartItem
                    key={index}
                    data={item}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
            </div>
          )}
        </div>

        {/* Footer - Show only when there are items */}
        {cart && cart.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            {/* Total */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
            </div>
            
            {/* Checkout Button */}
            <Link to="/checkout" onClick={() => setOpenCart(false)}>
              <button className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg flex items-center justify-center gap-2">
                <AiOutlineShoppingCart className="w-5 h-5" />
                Checkout Now
              </button>
            </Link>
            
            {/* Continue Shopping */}
            <button
              onClick={() => setOpenCart(false)}
              className="w-full py-3 mt-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CartItem = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

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
            onClick={() => removeFromCartHandler(data)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
          >
            <AiOutlineDelete size={12} />
          </button>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm leading-tight mb-2 line-clamp-2">
            {data.name}
          </h3>
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-blue-600">
              ${totalPrice.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">
              ${data.discountPrice} × {value}
            </span>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full ${data.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-xs ${data.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.stock > 0 ? `${data.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => decrement(data)}
              disabled={value <= 1}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
            >
              <HiOutlineMinus size={16} className="text-gray-600" />
            </button>
            
            <span className="w-12 text-center font-medium text-gray-900">
              {value}
            </span>
            
            <button
              onClick={() => increment(data)}
              disabled={data.stock <= value}
              className="w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 disabled:bg-gray-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
            >
              <HiPlus size={16} className="text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
