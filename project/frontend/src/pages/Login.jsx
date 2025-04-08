"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
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
    if (!formData.email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.password) newErrors.password = "Password is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        console.log(`Login successful as ${userType}`, formData)
        navigate(userType === "admin" ? "/admin-dashboard" : "/")
      }, 1500)
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
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? "error" : ""}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${errors.password ? "error" : ""}`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            <div className="form-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

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
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .auth-container {
          width: 100%;
          max-width: 400px;
        }

        .auth-card {
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .auth-card h2 {
          text-align: center;
          margin-bottom: 10px;
        }

        .auth-subtitle {
          text-align: center;
          margin-bottom: 20px;
          color: #666;
        }

        .user-type-toggle {
          display: flex;
          margin-bottom: 20px;
        }

        .toggle-btn {
          flex: 1;
          padding: 10px;
          background: #f1f1f1;
          border: none;
          cursor: pointer;
        }

        .toggle-btn.active {
          background: #007bff;
          color: white;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }

        .form-control {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .form-control.error {
          border-color: #e53e3e;
        }

        .error-message {
          color: #e53e3e;
          font-size: 0.85rem;
          margin-top: 5px;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          margin-bottom: 20px;
        }

        .btn {
          width: 100%;
          padding: 12px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: 600;
        }

        .auth-redirect {
          text-align: center;
          margin-top: 10px;
        }

        .auth-redirect a {
          color: #007bff;
          text-decoration: none;
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}

export default Login
