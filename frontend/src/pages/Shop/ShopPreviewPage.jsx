import React from 'react'
import styles from '../../styles/styles'
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { Link, useParams } from "react-router-dom";
import { FaHome, FaChevronRight, FaStore } from "react-icons/fa";

const ShopPreviewPage = () => {
  const { id } = useParams();

  return (
    <>
      <Header activeHeading={2} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className={`${styles.section} py-8`}>
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <FaStore className="text-white text-2xl" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">Shop Preview</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover amazing products, exciting events, and customer reviews from this shop
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Shop Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8 border border-gray-100">
                <ShopInfo isOwner={false} />
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <ShopProfileData isOwner={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ShopPreviewPage