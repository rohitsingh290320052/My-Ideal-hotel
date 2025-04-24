"use client";

import { useState } from "react";
import Hero from "../components/home/Hero";
import FeaturedRooms from "../components/home/FeaturedRooms";
import AboutSection from "../components/home/AboutSection";

const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState("Mathura");

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="home-page">
      <Hero />

      <section className="section">
        <div className="container">
          <h2 className="section-title">
            Welcome to Brijwasi Hotel & Restaurant
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
        .home-page {
          font-family: Arial, sans-serif;
        }

        .section {
          background: #ffffcc;
          padding: 80px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 2.5rem;
          margin-bottom: 20px;
          font-weight: 700;
          color: #2c3e50;
        }

        .section-description {
          max-width: 800px;
          font-size: 1.2rem;
          line-height: 1.6;
          color: #4a4a4a;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }

          .section-description {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;