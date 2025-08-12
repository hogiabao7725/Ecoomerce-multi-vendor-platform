import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [allProducts, allEvents]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="w-full max-w-none px-2 sm:px-4 lg:px-6 py-4">
        <ProductDetails data={data} />
        {!eventData && data && (
          <div className="mt-8">
            <SuggestedProduct data={data} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
