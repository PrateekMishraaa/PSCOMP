import React, { useState } from 'react';
import LeftImage from "../assets/Onboarding.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "https://psquarebackend-1.onrender.com/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Login successful:", response.data);
      localStorage.setItem("token",response.data.token)
      toast.success("Login successful");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log("something went wrong",error);
      
    }
  };

  return (
    <>
      <section className="min-h-screen w-full  bg-gray-50">
        <div className="h-screen w-full flex rounded-2xl overflow-hidden shadow-lg">
          
          <div className="w-1/2 hidden md:block">
            <img
              src={LeftImage}
              alt="Login Visual"
              className="h-full w-full object-cover"
            />
          </div>

        
          <div className="w-full md:w-1/2 bg-white  flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
              <h2 className="text-3xl font-bold text-center text-[#4d007d]">
                Welcome Back
              </h2>

              {/* Email */}
              <div>
                <label className="block text-lg font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="pm921670@gmail.com"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

          
              <div>
                <label className="block text-lg font-semibold mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>

           
              <button
                type="submit"
                className="w-full cursor-pointer bg-[#4d007d] text-white py-2 rounded-lg hover:bg-[#38005b] transition duration-200"
              >
                Login
              </button>
            </form>

            <p className="text-sm mt-4 font-semibold">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-[#4d007d] font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Login;
