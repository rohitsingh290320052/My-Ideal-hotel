"use client"

import { useState, useEffect } from "react"

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    // In a real app, this would be an API call
    setRooms([
      {
        id: 1,
        name: "Deluxe Room",
        image: "deluxe.jpg",
        description: "Spacious room with a king-size bed and city view.",
      },
      {
        id: 2,
        name: "Executive Suite",
        image: "executive.jpg",
        description: "Luxurious suite with separate living area and premium amenities.",
      },
      {
        id: 3,
        name: "Family Room",
        image: "family.avif",
        description: "Perfect for families with two queen beds and extra space.",
      },
    ])
  }, [])

  return (
    <section className="section featured-rooms">
      <div className="container">
        <h2 className="section-title">Featured Rooms</h2>

        <div className="rooms-grid">
          {rooms.map((room) => (
            <div className="room-card" key={room.id}>
              <div className="room-image">
                <img src={room.image || "/placeholder.svg"} alt={room.name} />
              </div>
              <div className="room-info">
                <h3>{room.name}</h3>
                <p className="room-description">{room.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .featured-rooms {
          background-color: #FFFFCC;
        }
        
        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }
        
        .room-card {
          background-color: var(--white);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: var(--box-shadow);
          transition: var(--transition);
        }
        
        .room-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .room-image {
          height: 200px;
          overflow: hidden;
        }
        
        .room-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }
        
        .room-card:hover .room-image img {
          transform: scale(1.05);
        }
        
        .room-info {
          padding: 20px;
        }
        
        .room-info h3 {
          margin-bottom: 10px;
          color: var(--primary-color);
        }
        
        .room-price {
          color: var(--primary-color);
          font-weight: 600;
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
        
        .room-price span {
          font-size: 0.9rem;
          font-weight: 400;
          color: var(--gray);
        }
        
        .room-description {
          margin-bottom: 15px;
          color: var(--gray);
        }
      `}</style>
    </section>
  )
}

export default FeaturedRooms
