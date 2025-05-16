"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
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
    setFormData({
      ...formData,
      [name]: value,
    })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) newErrors.email = "Email is invalid"

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    else if (!/^\d{10}$/.test(formData.phone.trim())) newErrors.phone = "Phone number must be 10 digits"

    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      try {
        const endpoint = userType == "admin" ? "http://localhost:3000/staff/register" : "http://localhost:3000/guest/register"
        const requestBody = {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          password: formData.password,
          userType,
        };

        if (userType === "admin") {
          requestBody.role = "admin"; // or get this from a dropdown later
          requestBody.department = "HR"; // or any default value
        }

        const response = await axios.post(endpoint, requestBody);
        console.log("Registration successful:", response.data)
        navigate("/login")
      } catch (error) {
         console.error("Error:", error)
        if (error.response) {
          setErrors({ general: error.response.data.message || "Registration failed" })
        } else {
          setErrors({ general: "An error occurred. Please try again." })
        }
      } finally {
        setIsLoading(false)
      }
    }
  }
  

  return (
    <div className="register-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <h2>Create an Account</h2>

            <div className="user-type-toggle">
              <button
                className={`toggle-btn ${userType === "user" ? "active" : ""}`}
                onClick={() => setUserType("user")}
                type="button"
              >
                Register as User
              </button>
              <button
                className={`toggle-btn ${userType === "admin" ? "active" : ""}`}
                onClick={() => setUserType("admin")}
                type="button"
              >
                Register as Staff
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${errors.name ? "error" : ""}`}
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoFocus
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>

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

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-control ${errors.phone ? "error" : ""}`}
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
              </div>

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

              <button type="submit" className="btn btn-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : `Register as ${userType === "admin" ? "Admin" : "User"}`}
              </button>

              {errors.general && <p className="error-message">{errors.general}</p>}
            </form>

            <p className="auth-redirect">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .register-page {
          background: linear-gradient(to right, #f8f9fa, #eef1f5);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          font-family: 'Segoe UI', sans-serif;
        }

        .container {
          width: 100%;
        }

        .auth-container {
          background: #ffffff;
          border: 1px solid #ddd;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
          padding: 2rem 2.5rem;
          transition: box-shadow 0.3s ease;
        }

        .auth-container:hover {
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.1);
        }

        .auth-card h2 {
          font-family: 'Georgia', serif;
          font-size: 1.8rem;
          margin-bottom: 1rem;
          text-align: center;
          color: #333;
        }

        .user-type-toggle {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }

        .toggle-btn {
          padding: 0.5rem 1rem;
          font-weight: 500;
          background: #f0f0f0;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .toggle-btn.active {
          background: #2f80ed;
          color: #fff;
        }

        .form-group {
          margin-bottom: 1.2rem;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.4rem;
          color: #222;
        }

        .form-control {
          width: 100%;
          padding: 0.65rem 0.75rem;
          font-size: 1rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          transition: border-color 0.3s ease;
        }

        .form-control:focus {
          border-color: #2f80ed;
          outline: none;
        }

        .form-control.error {
          border-color: #e74c3c;
        }

        .error-message {
          color: #e74c3c;
          font-size: 0.85rem;
          margin-top: 0.3rem;
        }

        .btn {
          display: inline-block;
          width: 100%;
          padding: 0.75rem;
          background-color: #2f80ed;
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .btn:hover {
          background-color: #2566c7;
        }

        .btn:disabled {
          background-color: #a1c4fd;
          cursor: not-allowed;
        }

        .auth-redirect {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.95rem;
        }

        .auth-redirect a {
          color: #2f80ed;
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

export default Register
