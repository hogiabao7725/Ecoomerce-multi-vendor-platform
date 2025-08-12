import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div className="branding my-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandingData &&
              brandingData.map((i, index) => (
                <div 
                  className="flex items-start group hover:bg-white hover:shadow-md p-4 rounded-xl transition-all duration-300 cursor-pointer" 
                  key={index}
                >
                  <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                    {i.icon}
                  </div>
                  <div className="px-3">
                    <h3 className="font-bold text-sm md:text-base text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                      {i.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">
                      {i.Description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div
        className={`${styles.section} bg-white p-8 rounded-2xl mb-12 shadow-lg`}
        id="categories"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Shop by Category</h2>
          <p className="text-gray-600">Discover products in your favorite categories</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-6">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="group w-full h-32 bg-gradient-to-br from-gray-50 to-white rounded-xl flex items-center justify-between cursor-pointer overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >
                  <div className="p-4">
                    <h5 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                      {i.title}
                    </h5>
                  </div>
                  <div className="relative overflow-hidden">
                    <img
                      src={i.image_Url}
                      className="w-24 h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                      alt={i.title}
                    />
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
