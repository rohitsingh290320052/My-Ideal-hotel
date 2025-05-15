"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  })
  
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("user")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) setErrors({ ...errors, [name]: "" })
  }

  const validateForm = () => {
    const newErrors = {}
  
    if (userType === "admin") {
      if (!formData.email) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    } else {
      if (!formData.phone) newErrors.phone = "Phone number is required"
      else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits"
    }
  
    if (!formData.password) newErrors.password = "Password is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
  
      try {
        let response
  
        if (userType === "admin") {
          response = await axios.post("http://localhost:3000/staff/login", {
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
          })
        } else {
          response = await axios.post("http://localhost:3000/guest/login", {
            phone: formData.phone.trim(), // assuming guest logs in with phone
            password: formData.password,
          })
        }
  
        const result = response.data
  
        if (result.status) {
          // Save token in localStorage
          localStorage.setItem("token", result.token)
  
          // Save user type
          localStorage.setItem("userType", userType)
  
          // Redirect based on user type
          if (userType === "admin") {
            navigate("/admin/dashboard")
          } else {
            navigate("/guest/dashboard")
          }
        } else {
          setErrors({ form: result.message || "Login failed" })
        }
      } catch (error) {
        console.error("Login error:", error)
        if (error.response) {
          setErrors({ form: error.response.data.message || "Login failed" })
        } else {
          setErrors({ form: "An error occurred. Please try again." })
        }
      } finally {
        setIsLoading(false)
      }
    }
  }
  
  
  

  return (
    <div className="login-page">
      <div className="auth-container">
        <div className="auth-card">
          <h2>Login to Your Account</h2>
          <p className="auth-subtitle">Welcome back! Please enter your details</p>

          <div className="user-type-toggle">
            <button
              className={`toggle-btn ${userType === "user" ? "active" : ""}`}
              onClick={() => setUserType("user")}
              type="button"
            >
              User Login
            </button>
            <button
              className={`toggle-btn ${userType === "admin" ? "active" : ""}`}
              onClick={() => setUserType("admin")}
              type="button"
            >
              Admin Login
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {userType === "admin" ? (
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? "error" : ""}`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-control ${errors.phone ? "error" : ""}`}
                  placeholder="Enter your phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
              </div>
            )}


            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${errors.password ? "error" : ""}`}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            {errors.form && <p className="error-message" style={{ textAlign: "center" }}>{errors.form}</p>}

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? "Logging in..." : `Login as ${userType}`}
            </button>
          </form>

          <p className="auth-redirect">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to right, #e8eaf6, #f3e5f5);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .auth-container {
          width: 100%;
          max-width: 500px;
          padding: 2rem;
        }

        .auth-card {
          background-color: #fff;
          border-radius: 1rem;
          padding: 2.5rem;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .auth-card:hover {
          transform: translateY(-5px);
        }

        h2 {
          text-align: center;
          margin-bottom: 0.5rem;
          color: #3f51b5;
        }

        .auth-subtitle {
          text-align: center;
          font-size: 0.95rem;
          color: #666;
          margin-bottom: 2rem;
        }

        .user-type-toggle {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
          gap: 0.5rem;
        }

        .toggle-btn {
          padding: 0.5rem 1rem;
          background: #eee;
          border: 1px solid #ccc;
          border-radius: 20px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .toggle-btn.active {
          background-color: #3f51b5;
          color: #fff;
          border-color: #3f51b5;
        }

        .form-group {
          margin-bottom: 1.2rem;
        }

        label {
          display: block;
          font-size: 0.9rem;
          color: #333;
          margin-bottom: 0.4rem;
        }

        .form-control {
          width: 100%;
          padding: 0.6rem 0.8rem;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 0.95rem;
          transition: border 0.3s ease;
        }

        .form-control:focus {
          border-color: #3f51b5;
          outline: none;
        }

        .form-control.error {
          border-color: #e53935;
        }

        .error-message {
          font-size: 0.85rem;
          color: #e53935;
          margin-top: 0.3rem;
        }

        .btn {
          width: 100%;
          padding: 0.8rem;
          font-size: 1rem;
          background-color: #3f51b5;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .btn:hover {
          background-color: #303f9f;
        }

        .btn:disabled {
          background-color: #9fa8da;
          cursor: not-allowed;
        }

        .auth-redirect {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.9rem;
        }

        .auth-redirect a {
          color: #3f51b5;
          text-decoration: none;
          font-weight: 500;
        }

        .auth-redirect a:hover {
          text-decoration: underline;
        }
      `}</style>

    </div>
  )
}

export default Login;
