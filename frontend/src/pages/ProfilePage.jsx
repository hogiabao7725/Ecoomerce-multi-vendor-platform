import React, { useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import Loader from "../components/Layout/Loader";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="container mx-auto px-4 py-6 lg:py-8">
            <div className="mb-6 lg:mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 text-center lg:text-left">My Profile</h1>
              <p className="text-gray-600 text-center lg:text-left">Manage your account settings and preferences</p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Sidebar */}
              <div className="lg:w-80 flex-shrink-0 order-2 lg:order-1">
                <ProfileSideBar active={active} setActive={setActive} />
              </div>
              
              {/* Main Content */}
              <div className="flex-1 order-1 lg:order-2">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 lg:p-6">
                  <ProfileContent active={active} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
