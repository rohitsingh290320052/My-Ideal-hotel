"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"

    if (!formData.number) newErrors.number = "Phone number is required"
    else if (!/^\d{10}$/.test(formData.number)) newErrors.number = "Phone number must be 10 digits"

    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)

      try {
        const response = await axios.post("http://localhost:3000/guest/register", {
          name: formData.name,
          email: formData.email,
          number: formData.number,
          password: formData.password,
          userType,
        })

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
                Register as Admin
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
                <label htmlFor="number">Phone Number</label>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  className={`form-control ${errors.number ? "error" : ""}`}
                  placeholder="Enter your phone number"
                  value={formData.number}
                  onChange={handleChange}
                />
                {errors.number && <p className="error-message">{errors.number}</p>}
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
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
          padding: 60px 0;
        }

        .auth-container {
          display: flex;
          justify-content: center;
        }

        .auth-card {
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: var(--box-shadow);
          padding: 40px;
          width: 100%;
          max-width: 450px;
        }

        .auth-card h2 {
          color: var(--primary-color);
          margin-bottom: 10px;
          text-align: center;
        }

        .user-type-toggle {
          display: flex;
          margin-bottom: 25px;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }

        .toggle-btn {
          flex: 1;
          padding: 12px;
          border: none;
          background-color: #f8f9fa;
          cursor: pointer;
          font-weight: 500;
          transition: var(--transition);
        }

        .toggle-btn.active {
          background-color: var(--primary-color);
          color: white;
        }

        .btn-full {
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          margin-bottom: 20px;
        }

        .error-message {
          color: red;
          font-size: 0.875rem;
          margin-top: 5px;
        }
      `}</style>
    </div>
  )
}

export default Register
