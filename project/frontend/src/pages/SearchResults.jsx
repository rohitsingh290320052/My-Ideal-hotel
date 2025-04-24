"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

const SearchResults = () => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useState({ location: "", checkIn: "", checkOut: "" })
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [priceRange, setPriceRange] = useState([2000, 15000])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const locationParam = params.get("location") || ""
    const checkInParam = params.get("checkIn") || new Date().toISOString().split("T")[0]
    const checkOutParam = params.get("checkOut") || new Date(Date.now() + 86400000).toISOString().split("T")[0]

    setSearchParams({
      location: locationParam,
      checkIn: checkInParam,
      checkOut: checkOutParam,
    })

    fetchHotels(locationParam)
  }, [location.search])

  const fetchHotels = async (city) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/hotels/search?city=${encodeURIComponent(city)}`)
      if (!response.ok) throw new Error("Failed to fetch hotels")
      const data = await response.json()
      setHotels(data)
    } catch (error) {
      console.error("Error fetching hotels:", error)
      setHotels([])
    } finally {
      setLoading(false)
    }
  }

  const filteredHotels = hotels.filter(
    hotel => !hotel.price || (hotel.price >= priceRange[0] && hotel.price <= priceRange[1])
  )

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="search-results-page">
      <div className="search-results-header">
        <div className="container">
          <h1>
            {hotels.length} hotels found in or near {searchParams.location}
          </h1>
          <div className="search-dates">
            <span>
              {formatDate(searchParams.checkIn)} - {formatDate(searchParams.checkOut)}
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="search-results-content">
          <div className="hotels-list">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Searching for hotels...</p>
              </div>
            ) : filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <div className="hotel-card" key={hotel._id}>
                  <div className="hotel-info">
                    <div className="hotel-image">
                      <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} />
                    </div>

                    <div className="hotel-details">
                      <h2 className="hotel-name">{hotel.name}</h2>
                      <p className="hotel-location">
                        <span className="location-dot">📍</span> {hotel.location.city}, {hotel.location.state}
                      </p>
                      <p className="hotel-description">{hotel.description}</p>
                    </div>

                    <div className="hotel-pricing">
                      {hotel.price && (
                        <>
                          <div className="current-price">INR {hotel.price.toLocaleString()}</div>
                          <div className="price-note">per night</div>
                          <div className="tax-note">VAT excluded</div>
                        </>
                      )}
                      <Link to="/rooms" className="see-rooms-btn">
                        EXPLORE
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">No Hotels found in this area</div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .search-results-page {
          background: linear-gradient(to right, #fdfbfb, #ebedee);
          min-height: 100vh;
          padding: 2rem 0;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .container {
          width: 90%;
          max-width: 1200px;
          margin: auto;
        }

        .search-results-header {
          background: #ffffff;
          border-radius: 10px;
          padding: 1.5rem 2rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          text-align: center;
        }

        .search-results-header h1 {
          font-size: 1.6rem;
          color: #2e7d32;
          margin-bottom: 0.5rem;
        }

        .search-dates span {
          font-size: 0.95rem;
          color: #555;
        }

        .search-results-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .hotels-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .hotel-card {
          background-color: #fff;
          border-radius: 10px;
          display: flex;
          padding: 1rem;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
          transition: transform 0.2s ease;
        }

        .hotel-card:hover {
          transform: translateY(-4px);
        }

        .hotel-info {
          display: flex;
          flex-direction: row;
          width: 100%;
          gap: 1.5rem;
        }

        .hotel-image img {
          width: 180px;
          height: 130px;
          object-fit: cover;
          border-radius: 8px;
        }

        .hotel-details {
          flex: 1;
        }

        .hotel-name {
          font-size: 1.2rem;
          color: #004d40;
          margin-bottom: 0.3rem;
        }

        .hotel-location {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.5rem;
        }

        .location-dot {
          font-size: 1rem;
          margin-right: 4px;
        }

        .hotel-description {
          font-size: 0.95rem;
          color: #444;
        }

        .hotel-pricing {
          text-align: right;
          min-width: 150px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
        }

        .current-price {
          font-size: 1.1rem;
          font-weight: bold;
          color: #1b5e20;
        }

        .price-note,
        .tax-note {
          font-size: 0.75rem;
          color: #888;
        }

        .see-rooms-btn {
          margin-top: 0.8rem;
          padding: 0.5rem 1rem;
          background-color: #2e7d32;
          color: white;
          border-radius: 6px;
          font-size: 0.85rem;
          text-decoration: none;
          transition: background 0.3s ease;
        }

        .see-rooms-btn:hover {
          background-color: #1b5e20;
        }

        .loading-container {
          text-align: center;
          padding: 3rem 0;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #c8e6c9;
          border-top-color: #2e7d32;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .no-results {
          text-align: center;
          font-size: 1rem;
          color: #b71c1c;
          padding: 2rem 0;
        }

        @media (max-width: 768px) {
          .hotel-info {
            flex-direction: column;
            align-items: center;
          }

          .hotel-image img {
            width: 100%;
            height: auto;
          }

          .hotel-pricing {
            align-items: center;
            text-align: center;
          }

          .see-rooms-btn {
            width: 100%;
          }
        }
      `}</style>

    </div>
  )
}

export default SearchResults
