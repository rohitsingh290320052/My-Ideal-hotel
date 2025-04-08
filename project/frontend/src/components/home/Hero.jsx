"use client"

import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Experience Luxury & Comfort</h1>
        <p>Discover the perfect blend of elegance and hospitality at Brijwasi Hotel</p>
      </div>

      <style jsx>{`
        .hero {
          height: 80vh;
          background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('background.jpeg');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--white);
        }
        
        .hero-content {
          max-width: 800px;
          padding: 0 20px;
        }
        
        .hero h1 {
          font-size: 3rem;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          color: #FFFFCC;
        }
        
        .hero p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        }
        
        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.2rem;
          }
          
          .hero p {
            font-size: 1rem;
          }
        }
        
        @media (max-width: 576px) {
          .hero-buttons {
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }
          
          .hero-buttons .btn {
            width: 100%;
            max-width: 200px;
          }
        }
      `}</style>
    </div>
  )
}

export default Hero

