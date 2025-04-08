"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Restaurant = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("info")
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    guests: "1",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const menuCategories = [
    {
      name: "Starters",
      items: [
        { name: "Vegetable Spring Rolls", price: 120 },
        { name: "Paneer Tikka", price: 160 },
        { name: "Aloo Tikki Chaat", price: 90 },
        { name: "Mathura Ke Dubki Wale Aloo with Kachori", price: 100 },
      ],
    },
    {
      name: "Main Course",
      items: [
        { name: "Paneer Butter Masala", price: 180 },
        { name: "Shahi Paneer", price: 190 },
        { name: "Aloo Gobi Masala", price: 130 },
        { name: "Mix Veg Curry", price: 140 },
        { name: "Dal Makhani", price: 150 },
        { name: "Malai Kofta", price: 170 },
        { name: "Vegetable Biryani with Raita", price: 160 },
        { name: "Bedai Sabzi (Brijwasi Special)", price: 120 },
        { name: "Chapati (2 pcs)", price: 20 },
        { name: "Tandoori Roti (2 pcs)", price: 30 },
        { name: "Butter Naan (1 pc)", price: 25 },
        { name: "Stuffed Paneer Kulcha", price: 50 },
      ],
    },
    {
      name: "Desserts & Drinks",
      items: [
        { name: "Gulab Jamun", price: 50 },
        { name: "Chocolate Brownie with Ice Cream", price: 100 },
        { name: "Peda (Brijwasi Special)", price: 40 },
        { name: "Rabri", price: 70 },
        { name: "Kesari Jalebi", price: 60 },
        { name: "Sweet Lassi", price: 50 },
      ],
    },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingData({
      ...bookingData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    const today = new Date().toISOString().split("T")[0]

    if (!bookingData.date) {
      newErrors.date = "Please select a date"
    } else if (bookingData.date < today) {
      newErrors.date = "Date cannot be in the past"
    }

    if (!bookingData.time) {
      newErrors.time = "Please select a time"
    }

    if (!bookingData.name) {
      newErrors.name = "Name is required"
    }

    if (!bookingData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(bookingData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!bookingData.phone) {
      newErrors.phone = "Phone number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)

        // Calculate reservation fee and taxes
        const reservationFee = 20
        const taxes = reservationFee * 0.15
        const totalAmount = reservationFee + taxes

        // Prepare booking details for payment page
        const bookingDetails = {
          type: "restaurant",
          date: bookingData.date,
          time: bookingData.time,
          guests: Number.parseInt(bookingData.guests),
          reservationFee,
          taxes,
          totalAmount,
        }

        // Navigate to payment page with booking details
        navigate("/booking-payment", { state: { bookingDetails } })
      }, 1500)
    }
  }

  return (
    <div className="restaurant-page">
      <div className="restaurant-hero">
        <div className="container">
          <h1>Brijwasi Restaurant</h1>
          <p>Experience the finest culinary delights in an elegant setting</p>
        </div>
      </div>

      <div className="container">
        <div className="restaurant-tabs">
          <button className={`tab-btn ${activeTab === "info" ? "active" : ""}`} onClick={() => handleTabChange("info")}>
            Restaurant Info
          </button>
          <button className={`tab-btn ${activeTab === "menu" ? "active" : ""}`} onClick={() => handleTabChange("menu")}>
            Menu
          </button>
          <button
            className={`tab-btn ${activeTab === "booking" ? "active" : ""}`}
            onClick={() => handleTabChange("booking")}
          >
            Book a Table
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "info" && (
            <div className="restaurant-info">
              <div className="info-grid">
                <div className="info-image">
                  <img src="brij_res.jpg" alt="Brijwasi Restaurant" />
                </div>

                <div className="info-details">
                  <h2>About Our Restaurant</h2>
                  <p>
                    Brijwasi Restaurant offers an exquisite dining experience with a blend of traditional and
                    contemporary cuisine. Our chefs use the finest ingredients to create memorable dishes that cater to
                    diverse palates.
                  </p>

                  <div className="info-box">
                    <h3>Opening Hours</h3>
                    <ul>
                      <li>
                        <span>Monday - Friday:</span> 12:00 PM - 10:00 PM
                      </li>
                      <li>
                        <span>Saturday - Sunday:</span> 11:00 AM - 11:00 PM
                      </li>
                    </ul>
                  </div>

                  <div className="info-box">
                    <h3>Location</h3>
                    <p>Ground Floor, Brijwasi Hotel, FMRF+FCQ, and, Bhuteshwar Rd, near New Bus Stand, near New Railway Station, Adarsh Nagar, Manoharpura, Mathura</p>
                  </div>

                  <div className="info-box">
                    <h3>Reservations</h3>
                    <p>For reservations, please call: +91 9854845925</p>
                    <p>Or book a table online using our booking form.</p>
                    <button className="btn btn-secondary" onClick={() => handleTabChange("booking")}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="restaurant-features">
                <div className="feature">
                  <h3>Fine Dining</h3>
                  <p>Elegant ambiance with premium table settings</p>
                </div>

                <div className="feature">
                  <h3>Expert Chefs</h3>
                  <p>Internationally trained chefs creating culinary masterpieces</p>
                </div>

                <div className="feature">
                  <h3>Live Music</h3>
                  <p>Enjoy live music on weekends</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "menu" && (
            <div className="restaurant-menu">
              <h2>Our Menu</h2>
              <p className="menu-intro">
                Explore our carefully crafted menu featuring a blend of traditional and contemporary dishes.
              </p>

              {menuCategories.map((category, index) => (
                <div className="menu-category" key={index}>
                  <h3>{category.name}</h3>
                  <div className="menu-items">
                    {category.items.map((item, itemIndex) => (
                      <div className="menu-item" key={itemIndex}>
                        <div className="menu-item-header">
                          <h4>{item.name}</h4>
                          <span className="menu-item-price">{item.price}</span>
                        </div>
                        <p className="menu-item-description">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="menu-note">
                <p>* All prices exclude taxes.</p>
              </div>

              <div className="menu-cta">
                <button className="btn" onClick={() => handleTabChange("booking")}>
                  Book a Table
                </button>
              </div>
            </div>
          )}

          {activeTab === "booking" && (
            <div className="restaurant-booking">
              <h2>Book a Table</h2>
              <p className="booking-intro">
                Reserve your table at Brijwasi Restaurant for a memorable dining experience.
              </p>

              {bookingSuccess ? (
                <div className="booking-success">
                  <h3>Booking Confirmed!</h3>
                  <p>Thank you for your reservation. We look forward to serving you.</p>
                  <p>A confirmation has been sent to your email.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="booking-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="date">Date*</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className={`form-control ${errors.date ? "error" : ""}`}
                        value={bookingData.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {errors.date && <p className="error-message">{errors.date}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="time">Time*</label>
                      <select
                        id="time"
                        name="time"
                        className={`form-control ${errors.time ? "error" : ""}`}
                        value={bookingData.time}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Time</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="12:30">12:30 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="13:30">1:30 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="18:30">6:30 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="19:30">7:30 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="20:30">8:30 PM</option>
                      </select>
                      {errors.time && <p className="error-message">{errors.time}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="guests">Number of Guests</label>
                      <select
                        id="guests"
                        name="guests"
                        className="form-control"
                        value={bookingData.guests}
                        onChange={handleInputChange}
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5">5 People</option>
                        <option value="6">6 People</option>
                        <option value="7+">7+ People</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name*</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className={`form-control ${errors.name ? "error" : ""}`}
                        placeholder="Your Name"
                        value={bookingData.name}
                        onChange={handleInputChange}
                      />
                      {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email*</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control ${errors.email ? "error" : ""}`}
                        placeholder="Your Email"
                        value={bookingData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone*</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className={`form-control ${errors.phone ? "error" : ""}`}
                        placeholder="Your Phone Number"
                        value={bookingData.phone}
                        onChange={handleInputChange}
                      />
                      {errors.phone && <p className="error-message">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="specialRequests">Special Requests</label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      className="form-control"
                      placeholder="Any special requests or dietary requirements"
                      value={bookingData.specialRequests}
                      onChange={handleInputChange}
                      rows="3"
                    ></textarea>
                  </div>

                  <div className="booking-note">
                    <p>* A reservation fee of Rupees 199 will be charged to secure your booking.</p>
                    <p>* This fee will be deducted from your final bill.</p>
                  </div>

                  <button type="submit" className="btn" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Continue to Payment"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .restaurant-page {
          padding-bottom: 60px;
        }
        
        .restaurant-hero {
          background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/placeholder.svg?height=400&width=1200');
          background-size: cover;
          background-position: center;
          color: var(--white);
          padding: 80px 0;
          text-align: center;
          margin-bottom: 40px;
        }
        
        .restaurant-hero h1 {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }
        
        .restaurant-hero p {
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .restaurant-tabs {
          display: flex;
          margin-bottom: 30px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .tab-btn {
          padding: 12px 24px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          color: var(--gray);
          transition: var(--transition);
          border-bottom: 3px solid transparent;
        }
        
        .tab-btn.active {
          color: var(--primary-color);
          border-bottom-color: var(--primary-color);
        }
        
        .tab-btn:hover {
          color: var(--primary-color);
        }
        
        .tab-content {
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: var(--box-shadow);
          padding: 30px;
        }
        
        /* Restaurant Info Tab */
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 40px;
        }
        
        .info-image img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
        
        .info-details h2 {
          color: var(--primary-color);
          margin-bottom: 20px;
        }
        
        .info-details p {
          margin-bottom: 20px;
          line-height: 1.7;
        }
        
        .info-box {
          margin-bottom: 25px;
        }
        
        .info-box h3 {
          color: var(--primary-color);
          margin-bottom: 10px;
          font-size: 1.2rem;
        }
        
        .info-box ul {
          list-style: none;
        }
        
        .info-box ul li {
          margin-bottom: 8px;
        }
        
        .info-box ul li span {
          font-weight: 500;
        }
        
        .restaurant-features {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        
        .feature {
          text-align: center;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
        }
        
        .feature-icon {
          font-size: 2rem;
          margin-bottom: 15px;
        }
        
        .feature h3 {
          color: var(--primary-color);
          margin-bottom: 10px;
          font-size: 1.1rem;
        }
        
        .feature p {
          font-size: 0.9rem;
          color: var(--gray);
        }
        
        /* Menu Tab */
        .restaurant-menu h2 {
          color: var(--primary-color);
          margin-bottom: 15px;
          text-align: center;
        }
        
        .menu-intro {
          text-align: center;
          margin-bottom: 30px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .menu-category {
          margin-bottom: 30px;
        }
        
        .menu-category h3 {
          color: var(--primary-color);
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .menu-items {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .menu-item {
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 8px;
          transition: var(--transition);
        }
        
        .menu-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .menu-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .menu-item h4 {
          color: var(--text-color);
          font-size: 1.1rem;
        }
        
        .menu-item-price {
          color: var(--primary-color);
          font-weight: 600;
        }
        
        .menu-item-description {
          color: var(--gray);
          font-size: 0.9rem;
        }
        
        .menu-note {
          margin-top: 30px;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 8px;
          font-size: 0.9rem;
          color: var(--gray);
        }
        
        .menu-cta {
          text-align: center;
          margin-top: 30px;
        }
        
        /* Booking Tab */
        .restaurant-booking h2 {
          color: var(--primary-color);
          margin-bottom: 15px;
          text-align: center;
        }
        
        .booking-intro {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .booking-form {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .booking-success {
          text-align: center;
          padding: 40px;
          background-color: #f0fff4;
          border-radius: 8px;
          border: 1px solid #c6f6d5;
        }
        
        .booking-success h3 {
          color: #38a169;
          margin-bottom: 15px;
        }
        
        .booking-note {
          margin: 20px 0;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 8px;
          font-size: 0.9rem;
          color: var(--gray);
        }
        
        @media (max-width: 992px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
          
          .restaurant-features {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .restaurant-tabs {
            flex-direction: column;
            border-bottom: none;
          }
          
          .tab-btn {
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            margin-bottom: 10px;
          }
          
          .tab-btn.active {
            background-color: var(--primary-color);
            color: var(--white);
            border-color: var(--primary-color);
          }
        }
        
        @media (max-width: 576px) {
          .restaurant-features {
            grid-template-columns: 1fr;
          }
          
          .menu-items {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default Restaurant

