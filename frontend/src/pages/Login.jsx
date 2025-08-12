import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from "../components/Login/Login.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuthenticated === true){
      // Check user role and redirect accordingly
      if (user && user.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, user, navigate])

  // Additional check when component mounts to handle cases where user is already authenticated
  useEffect(() => {
    if (isAuthenticated && user && user.role === "Admin") {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, user, navigate]);
  
  return (
    <div>
        <Login />
    </div>
  )
}

export default LoginPage;