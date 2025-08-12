import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productData } from "../../static/data";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";

const SuggestedProduct = ({ data }) => {
  const {allProducts} = useSelector((state) => state.products);
  const [productData,setProductData] = useState();

  useEffect(() => {
    const d =
    allProducts && allProducts.filter((i) => i.category === data.category);
    setProductData(d);
  }, []);

  if (!productData || productData.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Related Products
        </h2>
        <p className="text-gray-600">
          More products you might like
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {productData && productData.map((i, index) => (
          <div key={index}>
            <ProductCard data={i} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedProduct;
