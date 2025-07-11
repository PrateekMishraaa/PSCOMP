import React, { useState } from 'react';
import LeftImage from "../assets/Onboarding.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    ConfirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, mobile, password, ConfirmPassword } = formData;

    if (!fullName || !email || !mobile || !password || !ConfirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Mobile number must be 10 digits");
      return;
    }

    if (password !== ConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://psquarebackend-1.onrender.com/signup",
        {
          fullName,
          email,
          mobile,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.role);
      toast.success("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        ConfirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      // const msg = error?.response?.data?.message || "Something went wrong";
      toast.error("something went wrong");
    }
  };

  const styles = {
    section: {
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#f9fafb',
      padding: '0',
      margin: '0'
    },
    container: {
      height: '100vh',
      width: '100%',
      display: 'flex',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    imageContainer: {
      width: '50%',
      display: 'none'
    },
    image: {
      height: '100%',
      width: '100%',
      objectFit: 'cover'
    },
    formContainer: {
      width: '100%',
      backgroundColor: 'white',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box'
    },
    form: {
      width: '100%',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    title: {
      fontSize: '30px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#4d007d',
      marginBottom: '20px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      display: 'block',
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '4px',
      color: '#374151'
    },
    input: {
      width: '100%',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#10b981',
      boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.2)'
    },
    passwordContainer: {
      position: 'relative'
    },
    passwordInput: {
      width: '100%',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '8px 40px 8px 12px',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxSizing: 'border-box'
    },
    eyeIcon: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#6b7280',
      fontSize: '16px'
    },
    button: {
      width: '100%',
      backgroundColor: '#4d007d',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginTop: '8px'
    },
    buttonHover: {
      backgroundColor: '#38005b'
    },
    loginText: {
      fontSize: '14px',
      marginTop: '16px',
      fontWeight: '600',
      textAlign: 'center',
      color: '#374151'
    },
    loginLink: {
      color: '#4d007d',
      fontWeight: '600',
      textDecoration: 'none'
    },
    loginLinkHover: {
      textDecoration: 'underline'
    }
  };

  // Media queries for responsive design
  const mediaQueries = `
    @media (min-width: 768px) {
      .image-container {
        display: block !important;
      }
      .form-container {
        width: 50% !important;
      }
    }
    
    @media (max-width: 767px) {
      .container {
        height: auto !important;
        min-height: 100vh !important;
        border-radius: 0 !important;
      }
      .form-container {
        padding: 20px !important;
      }
      .form {
        max-width: 100% !important;
      }
      .title {
        font-size: 24px !important;
      }
      .label {
        font-size: 16px !important;
      }
    }
    
    @media (max-width: 480px) {
      .form-container {
        padding: 15px !important;
      }
      .title {
        font-size: 20px !important;
      }
      .input, .password-input {
        font-size: 14px !important;
      }
      .button {
        font-size: 14px !important;
      }
    }
  `;

  return (
    <>
      <style>{mediaQueries}</style>
      <section style={styles.section}>
        <div style={styles.container} className="container">
          {/* Left Side Image */}
          <div style={styles.imageContainer} className="image-container">
            <img
              src={LeftImage}
              alt="Signup Visual"
              style={styles.image}
            />
          </div>

          {/* Right Side Form */}
          <div style={styles.formContainer} className="form-container">
            <form
              onSubmit={handleSubmit}
              style={styles.form}
              className="form"
            >
              <h2 style={styles.title} className="title">
                Welcome To Dashboard
              </h2>

              {/* Full Name */}
              <div style={styles.inputGroup}>
                <label style={styles.label} className="label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Prateek Mishra"
                  style={styles.input}
                  className="input"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#10b981';
                    e.target.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Email */}
              <div style={styles.inputGroup}>
                <label style={styles.label} className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  style={styles.input}
                  className="input"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#10b981';
                    e.target.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Mobile */}
              <div style={styles.inputGroup}>
                <label style={styles.label} className="label">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="9540802061"
                  style={styles.input}
                  className="input"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#10b981';
                    e.target.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Password */}
              <div style={styles.inputGroup}>
                <label style={styles.label} className="label">Password</label>
                <div style={styles.passwordContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    style={styles.passwordInput}
                    className="password-input"
                    onFocus={(e) => {
                      e.target.style.borderColor = '#10b981';
                      e.target.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div style={styles.inputGroup}>
                <label style={styles.label} className="label">Confirm Password</label>
                <div style={styles.passwordContainer}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="ConfirmPassword"
                    value={formData.ConfirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    style={styles.passwordInput}
                    className="password-input"
                    onFocus={(e) => {
                      e.target.style.borderColor = '#10b981';
                      e.target.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeIcon}
                  >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                style={styles.button}
                className="button"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#38005b';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#4d007d';
                }}
              >
                Register
              </button>
            </form>

            <p style={styles.loginText}>
              Already have an account?{" "}
              <Link 
                to="/login" 
                style={styles.loginLink}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = 'none';
                }}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Signup;