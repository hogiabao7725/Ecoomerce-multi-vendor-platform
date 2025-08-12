import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  const brands = [
    {
      name: "Sony",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png",
      description: "Innovation in entertainment"
    },
    {
      name: "Dell",
      logo: "https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png",
      description: "Technology solutions"
    },
    {
      name: "LG",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/LG_logo_%282014%29.svg",
      description: "Life's good"
    },
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/500px-Apple_logo_black.svg.png",
      description: "Think different"
    },
    {
      name: "Samsung",
      logo: "https://www.freepnglogos.com/uploads/original-samsung-logo-10.png",
      description: "Innovation for everyone"
    }
  ];

  return (
    <div className={`${styles.section} bg-gradient-to-r from-gray-50 to-white py-12 mb-12 rounded-2xl`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Trusted Partners</h2>
        <p className="text-gray-600">Leading brands that trust our platform</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
        {brands.map((brand, index) => (
          <div 
            key={index}
            className="group flex flex-col items-center p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-lg p-4 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mt-3 text-center group-hover:text-blue-600 transition-colors duration-200">
              {brand.name}
            </h3>
            <p className="text-xs text-gray-500 text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {brand.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsored;
