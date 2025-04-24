"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Rooms = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    price: "all",
    capacity: "all",
  })

  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setRooms([
        {
          id: 1,
          name: "Deluxe Room",
          price: '1,299',
          capacity: 2,
          image: "executive.jpg",
          description: "Spacious room with a king-size bed and city view.",
          amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Mini Bar"],
        },
        {
          id: 2,
          name: "Executive Suite",
          price: '1,699',
          capacity: 2,
          image: "deluxe.jpg",
          description: "Luxurious suite with separate living area and premium amenities.",
          amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Mini Bar", "Jacuzzi", "Lounge Area"],
        },
        {
          id: 3,
          name: "Family Room",
          price: '1,399',
          capacity: 4,
          image: "family.avif",
          description: "Perfect for families with two queen beds and extra space.",
          amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Mini Bar", "Extra Beds"],
        },
        {
          id: 4,
          name: "Standard Room",
          price: '1,000',
          capacity: 2,
          image: "standard.avif",
          description: "Comfortable room with all basic amenities for a pleasant stay.",
          amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV"],
        },
        {
          id: 6,
          name: "Trio Room",
          price: '1,099',
          capacity: 3,
          image: "tri.webp",
          description: "Cozy room with three single beds, ideal for friends or colleagues.",
          amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Work Desk"],
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilter({
      ...filter,
      [name]: value,
    })
  }

  const filteredRooms = rooms.filter((room) => {
    // Filter by price
    if (filter.price !== "all") {
      const [min, max] = filter.price.split("-").map(Number)
      if (max) {
        if (room.price < min || room.price > max) return false
      } else {
        if (room.price < min) return false
      }
    }

    // Filter by capacity
    if (filter.capacity !== "all" && room.capacity < Number.parseInt(filter.capacity)) {
      return false
    }

    return true
  })

  return (
    <div className="rooms-page">
      <div className="rooms-hero">
        <div className="container">
          <p>Discover comfort and luxury in our carefully designed accommodations</p>
          <Link to="/restaurant" className="btn dinein-btn">
            Dine-in
          </Link>
        </div>
      </div>

      <div className="container">
      <div className="rooms-filters">
        <div className="filter-group">
          <label htmlFor="capacity">Capacity:</label>
            <select
              id="capacity"
              name="capacity"
              value={filter.capacity}
              onChange={handleFilterChange}
              className="form-control"
            >
              <option value="all">Any Capacity</option>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="4">4 People</option>
            </select>
        </div>
      </div>


        {loading ? (
          <div className="loading">Loading rooms...</div>
        ) : (
          <>
            <div className="rooms-count">
              {filteredRooms.length} room{filteredRooms.length !== 1 ? "s" : ""} found
            </div>

            <div className="rooms-grid">
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <div className="room-card" key={room.id}>
                    <div className="room-image">
                      <img src={room.image || "/placeholder.svg"} alt={room.name} />
                      <div className="room-price">
                        {room.price}
                        <span>/night</span>
                      </div>
                    </div>
                    <div className="room-info">
                      <h3>{room.name}</h3>
                      <p className="room-capacity">
                        Max Capacity: {room.capacity} {room.capacity === 1 ? "Person" : "People"}
                      </p>
                      <p className="room-description">{room.description}</p>
                      <div className="room-amenities">
                        {room.amenities.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="amenity">
                            {amenity}
                          </span>
                        ))}
                        {room.amenities.length > 3 && (
                          <span className="amenity-more">+{room.amenities.length - 3} more</span>
                        )}
                      </div>
                      
                      {/* DO NOT REMOVE IT. IT IS IMPORTANT! */}
                      <Link to={`/rooms/${room.id}`} className="btn">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-rooms">
                  <p>No rooms match your current filters. Please try different criteria.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .rooms-page {
          padding-bottom: 60px;
        }
        
        .rooms-hero {
          background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('background.jpeg');
          background-size: cover;
          background-position: center;
          color: var(--white);
          padding: 80px 0;
          text-align: center;
          margin-bottom: 40px;
        }
        
        .rooms-hero p {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .dinein-btn {
          margin-top: 1rem;
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background-color: #ff6347;
          color: white;
          border: none;
          border-radius: 0.5rem;
          text-decoration: none;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }

.dinein-btn:hover {
  background-color: #e5533c;
}

        
        .rooms-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 30px;
          padding: 20px;
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: var(--box-shadow);
        }
        
        .filter-group {
          flex: 1;
          min-width: 200px;
        }
        
        .rooms-count {
          margin-bottom: 20px;
          font-weight: 500;
        }
        
        .rooms-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }
        
        .room-card {
          display: grid;
          grid-template-columns: 1fr 2fr;
          background-color: var(--white);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: var(--box-shadow);
        }
        
        .room-image {
          position: relative;
          height: 100%;
        }
        
        .room-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .room-price {
          position: absolute;
          top: 15px;
          right: 15px;
          background-color: var(--primary-color);
          color: var(--white);
          padding: 8px 12px;
          border-radius: 4px;
          font-weight: 600;
        }
        
        .room-price span {
          font-size: 0.8rem;
          font-weight: 400;
        }
        
        .room-info {
          padding: 25px;
        }
        
        .room-info h3 {
          color: var(--primary-color);
          margin-bottom: 10px;
          font-size: 1.4rem;
        }
        
        .room-capacity {
          color: var(--gray);
          margin-bottom: 15px;
          font-size: 0.9rem;
        }
        
        .room-description {
          margin-bottom: 20px;
          line-height: 1.6;
        }
        
        .room-amenities {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }
        
        .amenity {
          background-color: #f1f5f9;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 0.85rem;
        }
        
        .amenity-more {
          color: var(--primary-color);
          font-size: 0.85rem;
          padding: 5px 0;
        }
        
        .loading, .no-rooms {
          text-align: center;
          padding: 40px;
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: var(--box-shadow);
        }
        
        @media (max-width: 768px) {
          .room-card {
            grid-template-columns: 1fr;
          }
          
          .room-image {
            height: 200px;
          }
        }
      `}</style>
    </div>
  )
}

export default Rooms

