"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

const SearchResults = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useState({ location: "", checkIn: "", checkOut: "" })
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [priceRange, setPriceRange] = useState([2000, 15000])
  const [selectedFilters, setSelectedFilters] = useState({
    locationTypes: [],
    hotelTypes: [],
  })

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const locationParam = params.get("location") || ""
    const checkInParam = params.get("checkIn") || new Date().toISOString()
    const checkOutParam = params.get("checkOut") || new Date(Date.now() + 86400000).toISOString()

    setSearchParams({
      location: locationParam,
      checkIn: checkInParam,
      checkOut: checkOutParam,
    })

    // Fetch hotels based on search params
    fetchHotels(locationParam)
  }, [location.search])

  const fetchHotels = (locationQuery) => {
    setLoading(true)

    // In a real app, this would be an API call
    setTimeout(() => {
      // Mock data for hotels based on location
      const allCities = {
        delhi: [
          {
            id: 1,
            name: "Brijwasi Blu Hotel, New Delhi Paschim Vihar",
            location: "Outer Ring Road, Paschim Vihar",
            distance: "2.63 miles/4.23 kilometers from Delhi",
            description:
              "Located in upscale Paschim Vihar, our Brijwasi Blu hotel in West Delhi offers proximity to key business and leisure spots, stunning venues, and spacious rooms with first-class amenities. Enjoy on-site dining, 24-hour room service, and more.",
            price: 9350,
            image: "/placeholder.svg?height=300&width=500",
            tags: [],
            city: "Delhi",
          },
          {
            id: 2,
            name: "Brijwasi Blu Hotel, New Delhi Dwarka",
            location: "Plot 4, Dwarka City Centre, Sector 13",
            distance: "8.45 miles/13.61 kilometers from Delhi",
            description:
              "Located just outside the city and within walking distance of the Delhi Metro, the elegant Brijwasi Blu New Delhi Dwarka offers first-class amenities like on-site dining, an outdoor pool, a spa, and valet service.",
            price: 6930,
            image: "/placeholder.svg?height=300&width=500",
            tags: [],
            city: "Delhi",
          },
          {
            id: 3,
            name: "Brijwasi Blu Plaza Hotel, Delhi Airport",
            location: "Near Mahipalpur Extension NH 8",
            distance: "11.13 miles/17.91 kilometers from Delhi",
            description:
              "For a memorable retreat near the Delhi airport and New Delhi's bustling business and shopping district, book a stay at the Brijwasi Blu Plaza and enjoy spacious rooms, on-site bars and restaurants, a spa, and flexible meeting venues.",
            price: 10892,
            image: "/placeholder.svg?height=300&width=500",
            tags: [],
            city: "Delhi",
          },
        ],
        mathura: [
          {
            id: 4,
            name: "Brijwasi Royal Hotel, Mathura",
            location: "Krishna Nagar, Near Banke Bihari Temple",
            distance: "0.5 miles from Mathura Junction",
            description:
              "Experience the spiritual essence of Mathura at Brijwasi Royal Hotel, located near the sacred Banke Bihari Temple. Our hotel offers traditional decor with modern amenities, vegetarian dining options, and guided temple tours.",
            price: 5500,
            image: "/placeholder.svg?height=300&width=500",
            tags: [],
            city: "Mathura",
          },
          {
            id: 5,
            name: "Brijwasi Heritage Inn, Mathura",
            location: "Govardhan Road, Near ISKCON Temple",
            distance: "2.3 miles from Mathura City Center",
            description:
              "Brijwasi Heritage Inn combines traditional Braj architecture with modern comforts. Located near the ISKCON Temple, our hotel features spacious rooms, authentic vegetarian cuisine, and cultural performances in the evening.",
            price: 4200,
            image: "/placeholder.svg?height=300&width=500",
            tags: [],
            city: "Mathura",
          },
        ],
        ayodhya: [
          {
            id: 6,
            name: "Brijwasi Ayodhya Retreat",
            location: "Ram Path, Near Ram Mandir",
            distance: "0.8 miles from Ayodhya Railway Station",
            description:
              "Brijwasi Ayodhya Retreat offers a serene stay near the sacred Ram Mandir. Our hotel features traditional decor, comfortable rooms, pure vegetarian dining, and guided spiritual tours to help you experience the divine atmosphere of Ayodhya.",
            price: 4800,
            image: "/placeholder.svg?height=300&width=500",
            tags: [],
            city: "Ayodhya",
          },
        ],
        jaipur: [
          {
            id: 7,
            name: "Brijwasi Palace Hotel, Jaipur",
            location: "Civil Lines, Near Jaipur Railway Station",
            distance: "1.2 miles from City Palace",
            description:
              "Experience royal Rajasthani hospitality at Brijwasi Palace Hotel. Our heritage property features traditional Rajasthani architecture, spacious rooms with modern amenities, rooftop restaurant with city views, and cultural performances.",
            price: 7800,
            image: "/placeholder.svg?height=300&width=500",
            tags: [],
            city: "Jaipur",
          },
          {
            id: 8,
            name: "Brijwasi Haveli, Jaipur",
            location: "Amer Road, Near Jal Mahal",
            distance: "3.5 miles from Hawa Mahal",
            description:
              "Brijwasi Haveli is a boutique heritage hotel offering an authentic Rajasthani experience. Enjoy traditional decor, personalized service, rooftop dining with lake views, and easy access to Jaipur's famous attractions.",
            price: 6500,
            image: "/placeholder.svg?height=300&width=500",
            tags: [],
            city: "Jaipur",
          },
        ],
        varanasi: [
          {
            id: 9,
            name: "Brijwasi Ganga View, Varanasi",
            location: "Dashashwamedh Ghat Road",
            distance: "0.3 miles from Kashi Vishwanath Temple",
            description:
              "Experience the spiritual essence of Varanasi at Brijwasi Ganga View. Our hotel offers rooms with stunning views of the sacred Ganges River, traditional decor, vegetarian dining, and easy access to the famous Ganga Aarti ceremony.",
            price: 5200,
            image: "/placeholder.svg?height=300&width=500",
            tags: [],
            city: "Varanasi",
          },
        ],
        haridwar: [
          {
            id: 10,
            name: "Brijwasi Riverside Resort, Haridwar",
            location: "Har Ki Pauri, Ganga Ghat",
            distance: "0.5 miles from Haridwar Railway Station",
            description:
              "Brijwasi Riverside Resort offers a peaceful retreat by the sacred Ganges River. Enjoy comfortable rooms, yoga sessions, Ayurvedic spa treatments, and vegetarian dining while experiencing the spiritual atmosphere of Haridwar.",
            price: 4800,
            image: "/placeholder.svg?height=300&width=500",
            tags: [],
            city: "Haridwar",
          },
        ],
        puri: [
          {
            id: 11,
            name: "Brijwasi Beach Resort, Puri",
            location: "Marine Drive Road, Near Jagannath Temple",
            distance: "0.7 miles from Puri Beach",
            description:
              "Brijwasi Beach Resort offers a perfect blend of spiritual and beach vacation. Located near the famous Jagannath Temple and Puri Beach, our resort features sea-facing rooms, traditional Odisha cuisine, and cultural activities.",
            price: 5800,
            image: "/placeholder.svg?height=300&width=500",
            tags: [],
            city: "Puri",
          },
        ],
      }

      // Combine all hotels into a single array
      const allHotels = Object.values(allCities).flat()

      // Filter hotels based on location if provided
      let filteredHotels = allHotels
      if (locationQuery) {
        const query = locationQuery.toLowerCase()
        filteredHotels = allHotels.filter(
          (hotel) =>
            hotel.name.toLowerCase().includes(query) ||
            hotel.location.toLowerCase().includes(query) ||
            hotel.city.toLowerCase().includes(query),
        )
      }

      setHotels(filteredHotels)
      setLoading(false)
    }, 1000)
  }

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange]
    newPriceRange[index] = Number.parseInt(e.target.value)
    setPriceRange(newPriceRange)
  }

  const toggleFilter = (type, value) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev }
      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter((item) => item !== value)
      } else {
        newFilters[type] = [...newFilters[type], value]
      }
      return newFilters
    })
  }

  const locationTypes = [
    "Business district",
    "Business park",
    "City center",
    "Convention center",
    "Countryside/Rural",
    "Downtown",
    "Entertainment district",
    "Historic district",
    "Hospital clinic",
    "Lakefront",
    "Mountain",
    "Nature reserve",
  ]

  const hotelTypes = [
    "Adults Only",
    "Airport",
    "Business",
    "Conference",
    "Convention Center",
    "Leisure",
    "Resort",
    "Serviced Apartment",
    "Spa",
  ]

  // Format date for display
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
            {hotels.length} hotels found in or near {searchParams.location || "Delhi"}
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
          <div className="filters-sidebar">
            <div className="filter-section">
              <h3>
                Price <span className="toggle-icon">▼</span>
              </h3>
              <div className="price-slider">
                <div className="price-range">
                  <div className="price-slider-track">
                    <div
                      className="price-slider-fill"
                      style={{
                        left: `${((priceRange[0] - 2000) / 13000) * 100}%`,
                        width: `${((priceRange[1] - priceRange[0]) / 13000) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="15000"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="price-slider-input"
                  />
                  <input
                    type="range"
                    min="2000"
                    max="15000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="price-slider-input"
                  />
                </div>
                <div className="price-inputs">
                  <div className="price-input">
                    <label>From</label>
                    <div className="price-value">INR {priceRange[0].toLocaleString()}</div>
                  </div>
                  <div className="price-input">
                    <label>to</label>
                    <div className="price-value">INR {priceRange[1].toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h3>
                Location type <span className="toggle-icon">▼</span>
              </h3>
              <div className="filter-options">
                {locationTypes.map((type, index) => (
                  <div className="filter-option" key={index}>
                    <input
                      type="checkbox"
                      id={`location-${index}`}
                      checked={selectedFilters.locationTypes.includes(type)}
                      onChange={() => toggleFilter("locationTypes", type)}
                    />
                    <label htmlFor={`location-${index}`}>{type}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>
                Hotel types <span className="toggle-icon">▼</span>
              </h3>
              <div className="filter-options">
                {hotelTypes.map((type, index) => (
                  <div className="filter-option" key={index}>
                    <input
                      type="checkbox"
                      id={`hotel-${index}`}
                      checked={selectedFilters.hotelTypes.includes(type)}
                      onChange={() => toggleFilter("hotelTypes", type)}
                    />
                    <label htmlFor={`hotel-${index}`}>{type}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hotels-list">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Searching for hotels...</p>
              </div>
            ) : hotels.length > 0 ? (
              hotels.map((hotel) => (
                <div className="hotel-card" key={hotel.id}>
                  <div className="hotel-info">
                    <div className="hotel-image">
                      <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} />
                      {hotel.tags.length > 0 && (
                        <div className="hotel-tags">
                          {hotel.tags.map((tag, index) => (
                            <span className="hotel-tag" key={index}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="hotel-rating">
                        <span className="rating-score">{hotel.rating}</span>
                      </div>
                    </div>

                    <div className="hotel-details">
                      <h2 className="hotel-name">{hotel.name}</h2>
                      <p className="hotel-location">
                        <span className="location-dot">📍</span> {hotel.location}{" "}
                        <span className="hotel-distance">{hotel.distance}</span>
                      </p>
                      <p className="hotel-description">{hotel.description}</p>
                      <div className="hotel-reviews">
                        <div className="review-stars">
                          {"★".repeat(Math.floor(hotel.rating))}
                          {"☆".repeat(5 - Math.floor(hotel.rating))}
                        </div>
                        <span className="review-count">{hotel.reviews} reviews</span>
                      </div>
                    </div>

                    <div className="hotel-pricing">
                      {hotel.discount > 0 && <div className="discount-badge">{hotel.discount}% savings</div>}
                      {hotel.discount > 0 && (
                        <div className="original-price">INR {hotel.originalPrice.toLocaleString()}</div>
                      )}
                      <div className="current-price">INR {hotel.price.toLocaleString()}</div>
                      <div className="price-note">per night</div>
                      <div className="tax-note">VAT excluded</div>
                      <Link to="/rooms" className="see-rooms-btn">
                        SEE ROOMS
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <h2>No hotels found</h2>
                <p>Try adjusting your search criteria or explore our popular destinations.</p>
                <button className="btn" onClick={() => navigate("/")}>
                  Return to Homepage
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .search-results-page {
          background-color: var(--light-bg);
          padding-bottom: 60px;
        }
        
        .search-results-header {
          background-color: var(--white);
          padding: 20px 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
        }
        
        .search-results-header h1 {
          font-size: 1.5rem;
          color: var(--primary-color);
          margin-bottom: 5px;
        }
        
        .search-dates {
          color: var(--gray);
          font-size: 0.9rem;
        }
        
        .search-results-content {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 30px;
        }
        
        .filters-sidebar {
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: var(--box-shadow);
          overflow: hidden;
          align-self: start;
        }
        
        .filter-section {
          padding: 20px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .filter-section h3 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          font-size: 1rem;
          color: var(--primary-color);
        }
        
        .toggle-icon {
          font-size: 0.8rem;
          color: var(--gray);
        }
        
        .price-slider {
          padding: 10px 0;
        }
        
        .price-range {
          position: relative;
          height: 30px;
          margin-bottom: 20px;
        }
        
        .price-slider-track {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          height: 4px;
          background-color: #e2e8f0;
          border-radius: 2px;
        }
        
        .price-slider-fill {
          position: absolute;
          top: 0;
          height: 100%;
          background-color: var(--primary-color);
          border-radius: 2px;
        }
        
        .price-slider-input {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
        
        .price-inputs {
          display: flex;
          justify-content: space-between;
        }
        
        .price-input {
          display: flex;
          flex-direction: column;
        }
        
        .price-input label {
          font-size: 0.8rem;
          color: var(--gray);
          margin-bottom: 5px;
        }
        
        .price-value {
          font-weight: 500;
        }
        
        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 200px;
          overflow-y: auto;
        }
        
        .filter-option {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .filter-option label {
          font-size: 0.9rem;
          cursor: pointer;
        }
        
        .hotels-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .hotel-card {
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: var(--box-shadow);
          overflow: hidden;
          transition: transform 0.3s;
        }
        
        .hotel-card:hover {
          transform: translateY(-5px);
        }
        
        .hotel-info {
          display: grid;
          grid-template-columns: 300px 1fr 200px;
          gap: 20px;
        }
        
        .hotel-image {
          position: relative;
          height: 100%;
        }
        
        .hotel-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .hotel-tags {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .hotel-tag {
          background-color: #ff9800;
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: bold;
        }
        
        .hotel-rating {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background-color: var(--primary-color);
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        
        .hotel-details {
          padding: 20px 0;
        }
        
        .hotel-name {
          color: var(--primary-color);
          margin-bottom: 10px;
          font-size: 1.3rem;
        }
        
        .hotel-location {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          font-size: 0.9rem;
          color: var(--gray);
        }
        
        .location-dot {
          margin-right: 5px;
        }
        
        .hotel-distance {
          margin-left: 5px;
          font-size: 0.8rem;
        }
        
        .hotel-description {
          margin-bottom: 15px;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .hotel-reviews {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .review-stars {
          color: #ffc107;
        }
        
        .review-count {
          font-size: 0.9rem;
          color: var(--gray);
        }
        
        .hotel-pricing {
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          border-left: 1px solid #e2e8f0;
        }
        
        .discount-badge {
          background-color: #f44336;
          color: white;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          margin-bottom: 10px;
        }
        
        .original-price {
          text-decoration: line-through;
          color: var(--gray);
          font-size: 0.9rem;
          margin-bottom: 5px;
        }
        
        .current-price {
          font-size: 1.3rem;
          font-weight: bold;
          color: var(--primary-color);
        }
        
        .price-note {
          font-size: 0.8rem;
          color: var(--gray);
          margin-bottom: 5px;
        }
        
        .tax-note {
          font-size: 0.8rem;
          color: var(--gray);
          margin-bottom: 15px;
        }
        
        .see-rooms-btn {
          background-color: #d32f2f;
          color: white;
          padding: 10px 20px;
          border-radius: 4px;
          font-weight: bold;
          text-align: center;
          transition: background-color 0.3s;
        }
        
        .see-rooms-btn:hover {
          background-color: #b71c1c;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px;
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: var(--box-shadow);
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .no-results {
          text-align: center;
          padding: 50px;
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: var(--box-shadow);
        }
        
        .no-results h2 {
          color: var(--primary-color);
          margin-bottom: 15px;
        }
        
        .no-results p {
          margin-bottom: 20px;
        }
        
        @media (max-width: 1200px) {
          .search-results-content {
            grid-template-columns: 250px 1fr;
          }
        }
        
        @media (max-width: 992px) {
          .search-results-content {
            grid-template-columns: 1fr;
          }
          
          .hotel-info {
            grid-template-columns: 1fr;
          }
          
          .hotel-image {
            height: 250px;
          }
          
          .hotel-pricing {
            border-left: none;
            border-top: 1px solid #e2e8f0;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  )
}

export default SearchResults
