import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
    }
  }, [token, navigate]);

  return <>{children}
  <ToastContainer/>
  </>;
};

export default ProtectedRoute;
