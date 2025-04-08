"use client"

import { useState } from "react"
import Hero from "../components/home/Hero"
import FeaturedRooms from "../components/home/FeaturedRooms"
import AboutSection from "../components/home/AboutSection"

const Home = () => {
  const [selectedCity, setSelectedCity] = useState("Mathura")

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value)
  }

  return (
    <div className="home-page">
      <Hero />

      <section className="section">
        <div className="container">
          <h2 className="section-title">
            Welcome to Brijwasi Hotel & Restaurant {selectedCity}
          </h2>
          <p className="section-description">
            Experience luxury and comfort at its finest. Our hotel offers the
            perfect blend of elegance, convenience, and exceptional service for
            both business and leisure travelers.
          </p>
        </div>
      </section>

      <FeaturedRooms />
      <AboutSection />

      <style jsx>{`
        .section-description {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 30px;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  )
}

export default Home
