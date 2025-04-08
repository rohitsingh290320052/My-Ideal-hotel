"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

const RoomDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      // Mock data for the room
      const roomData = {
        id: Number.parseInt(id),
        name: "Deluxe Room",
        price: 150,
        capacity: 2,
        size: 400, // in sq ft
        images: [
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
        ],
        description:
          "Our Deluxe Room offers the perfect blend of comfort and elegance. Featuring a king-size bed with premium linens, a spacious work area, and a modern bathroom with luxury amenities. Enjoy city views and access to our fitness center and pool.",
        amenities: [
          "Free Wi-Fi",
          "Air Conditioning",
          "Flat-screen TV",
          "Mini Bar",
          "Coffee Maker",
          "In-room Safe",
          "Hair Dryer",
          "Iron & Ironing Board",
          "Room Service",
          "Daily Housekeeping",
        ],
        policies: [
          "Check-in time: 2:00 PM",
          "Check-out time: 12:00 PM",
          "No smoking",
          "No pets allowed",
          "Extra bed available on request (additional charges apply)",
        ],
      }

      setRoom(roomData)
      setLoading(false)
    }, 1000)
  }, [id])

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

    if (!bookingData.checkIn) {
      newErrors.checkIn = "Please select a check-in date"
    } else if (bookingData.checkIn < today) {
      newErrors.checkIn = "Check-in date cannot be in the past"
    }

    if (!bookingData.checkOut) {
      newErrors.checkOut = "Please select a check-out date"
    } else if (bookingData.checkOut <= bookingData.checkIn) {
      newErrors.checkOut = "Check-out date must be after check-in date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBooking = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Calculate number of nights
      const checkIn = new Date(bookingData.checkIn)
      const checkOut = new Date(bookingData.checkOut)
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))

      // Calculate taxes (15% of room price)
      const taxes = room.price * nights * 0.15

      // Calculate total amount
      const totalAmount = room.price * nights + taxes

      // Prepare booking details for payment page
      const bookingDetails = {
        type: "room",
        roomName: room.name,
        roomPrice: room.price,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        nights,
        guests: {
          adults: Number.parseInt(bookingData.adults),
          children: Number.parseInt(bookingData.children),
        },
        taxes,
        totalAmount,
      }

      // Navigate to payment page with booking details
      navigate("/booking-payment", { state: { bookingDetails } })
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading room details...</div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="error-container">
        <div className="error">Room not found. Please try another room.</div>
        <Link to="/rooms" className="btn">
          Back to Rooms
        </Link>
      </div>
    )
  }

  return (
    <div className="room-detail-page">
      <div className="container">
        <div className="room-navigation">
          <Link to="/rooms" className="back-link">
            ← Back to Rooms
          </Link>
        </div>

        <div className="room-gallery">
          <div className="main-image">
            <img src={room.images[0] || "/placeholder.svg"} alt={room.name} />
          </div>
          <div className="thumbnail-images">
            {room.images.map((image, index) => (
              <div className="thumbnail" key={index}>
                <img src={image || "/placeholder.svg"} alt={`${room.name} - View ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="room-content">
          <div className="room-info">
            <div className="room-header">
              <h1>{room.name}</h1>
              <div className="room-price">
                ${room.price}
                <span>/night</span>
              </div>
            </div>

            <div className="room-specs">
              <div className="spec">
                <span className="spec-label">Max Capacity:</span>
                <span className="spec-value">{room.capacity} People</span>
              </div>
              <div className="spec">
                <span className="spec-label">Size:</span>
                <span className="spec-value">{room.size} sq ft</span>
              </div>
            </div>

            <div className="room-description">
              <h2>Description</h2>
              <p>{room.description}</p>
            </div>

            <div className="room-amenities">
              <h2>Amenities</h2>
              <ul className="amenities-list">
                {room.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>

            <div className="room-policies">
              <h2>Policies</h2>
              <ul className="policies-list">
                {room.policies.map((policy, index) => (
                  <li key={index}>{policy}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="booking-card">
            <h2>Book This Room</h2>
            <form onSubmit={handleBooking}>
              <div className="form-group">
                <label htmlFor="checkIn">Check-in Date</label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  className={`form-control ${errors.checkIn ? "error" : ""}`}
                  value={bookingData.checkIn}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
                {errors.checkIn && <p className="error-message">{errors.checkIn}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="checkOut">Check-out Date</label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  className={`form-control ${errors.checkOut ? "error" : ""}`}
                  value={bookingData.checkOut}
                  onChange={handleInputChange}
                  min={bookingData.checkIn || new Date().toISOString().split("T")[0]}
                  required
                />
                {errors.checkOut && <p className="error-message">{errors.checkOut}</p>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="adults">Adults</label>
                  <select
                    id="adults"
                    name="adults"
                    className="form-control"
                    value={bookingData.adults}
                    onChange={handleInputChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="children">Children</label>
                  <select
                    id="children"
                    name="children"
                    className="form-control"
                    value={bookingData.children}
                    onChange={handleInputChange}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>

              <div className="booking-summary">
                <div className="summary-item">
                  <span>Room Price:</span>
                  <span>${room.price}/night</span>
                </div>
                <div className="summary-item">
                  <span>Taxes & Fees:</span>
                  <span>${Math.round(room.price * 0.15)}</span>
                </div>
                <div className="summary-total">
                  <span>Total:</span>
                  <span>${room.price + Math.round(room.price * 0.15)}/night</span>
                </div>
              </div>

              <button type="submit" className="btn btn-full">
                Continue to Payment
              </button>
            </form>

            <div className="booking-note">
              <p>* Free cancellation up to 24 hours before check-in</p>
              <p>* Payment will be processed at checkout</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .room-detail-page {
          padding: 40px 0 60px;
        }
        
        .room-navigation {
          margin-bottom: 20px;
        }
        
        .back-link {
          color: var(--primary-color);
          font-weight: 500;
          display: inline-block;
          margin-bottom: 20px;
        }
        
        .room-gallery {
          margin-bottom: 30px;
        }
        
        .main-image {
          width: 100%;
          height: 500px;
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 15px;
        }
        
        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .thumbnail-images {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 15px;
        }
        
        .thumbnail {
          height: 100px;
          overflow: hidden;
          border-radius: 8px;
          cursor: pointer;
        }
        
        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }
        
        .thumbnail:hover img {
          transform: scale(1.05);
        }
        
        .room-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }
        
        .room-info {
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: var(--box-shadow);
          padding: 30px;
        }
        
        .room-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .room-header h1 {
          color: var(--primary-color);
          font-size: 2rem;
        }
        
        .room-price {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--primary-color);
        }
        
        .room-price span {
          font-size: 1rem;
          font-weight: 400;
          color: var(--gray);
        }
        
        .room-specs {
          display: flex;
          gap: 30px;
          margin-bottom: 25px;
        }
        
        .spec {
          display: flex;
          flex-direction: column;
        }
        
        .spec-label {
          font-size: 0.9rem;
          color: var(--gray);
          margin-bottom: 5px;
        }
        
        .spec-value {
          font-weight: 500;
        }
        
        .room-description, .room-amenities, .room-policies {
          margin-bottom: 30px;
        }
        
        .room-description h2, .room-amenities h2, .room-policies h2 {
          color: var(--primary-color);
          font-size: 1.3rem;
          margin-bottom: 15px;
        }
        
        .room-description p {
          line-height: 1.7;
        }
        
        .amenities-list, .policies-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        
        .amenities-list li, .policies-list li {
          padding-left: 20px;
          position: relative;
        }
        
        .amenities-list li:before, .policies-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--primary-color);
        }
        
        .booking-card {
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: var(--box-shadow);
          padding: 25px;
          position: sticky;
          top: 20px;
        }
        
        .booking-card h2 {
          color: var(--primary-color);
          font-size: 1.3rem;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        
        .booking-summary {
          margin: 20px 0;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 8px;
        }
        
        .summary-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        
        .summary-total {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
          padding-top: 10px;
          border-top: 1px solid #e2e8f0;
        }
        
        .btn-full {
          width: 100%;
          padding: 12px;
          font-size: 1rem;
        }
        
        .booking-note {
          margin-top: 15px;
          font-size: 0.85rem;
          color: var(--gray);
        }
        
        .loading-container, .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          text-align: center;
        }
        
        .loading, .error {
          padding: 20px;
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: var(--box-shadow);
          margin-bottom: 20px;
        }
        
        @media (max-width: 992px) {
          .room-content {
            grid-template-columns: 1fr;
          }
          
          .booking-card {
            position: static;
          }
        }
        
        @media (max-width: 768px) {
          .main-image {
            height: 350px;
          }
          
          .room-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .room-header h1 {
            margin-bottom: 10px;
          }
          
          .amenities-list, .policies-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default RoomDetail

