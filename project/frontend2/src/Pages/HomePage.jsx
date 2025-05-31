import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import './homepage.css'; // Assuming you have a CSS file for styling

const sliderImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
];

const HomePage = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (!destination) {
      alert('Please select a destination');
      return;
    }
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    navigate(`/hotels/search?city=${encodeURIComponent(destination)}&checkin=${checkIn}&checkout=${checkOut}`);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const prevSlide = () => setCurrent(current === 0 ? sliderImages.length - 1 : current - 1);
  const nextSlide = () => setCurrent((current + 1) % sliderImages.length);
  const goToSlide = (index) => setCurrent(index);

  return (
    <div>
      <Navbar />
      
      {/* Hero Section with Slider */}
      <section className="hero-section">
        <div className="slider-container">
          <img
            src={sliderImages[current] || "/placeholder.svg"}
            alt="Hotel"
            className="slider-image"
          />
          <button onClick={prevSlide} className="slider-btn prev">‹</button>
          <button onClick={nextSlide} className="slider-btn next">›</button>
          
          <div className="slider-indicators">
            {sliderImages.map((_, index) => (
              <div
                key={index}
                className={`indicator ${index === current ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Brijwasi Group of Hotels</h1>
          <p className="hero-subtitle">Experience luxury and comfort in the heart of India's most sacred destinations</p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="booking-section">
        <div className="container">
          <h2 className="booking-title">Book Your Perfect Stay</h2>
          <div className="booking-form">
            <div className="form-group">
              <label className="form-label">Select Destination</label>
              <input 
                type="text" 
                list="destinations" 
                placeholder="Choose your destination" 
                onChange={handleDestinationChange} 
                value={destination}
                className="form-input"
              />
              <datalist id="destinations">
                <option value="Mathura" />
                <option value="Vrindavan" />
                <option value="Agra" />
                <option value="Delhi" />
                <option value="Jaipur" />
              </datalist>
            </div>
            
            <div className="form-group">
              <label className="form-label">Check-in Date</label>
              <input 
                type="date" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="form-input"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Check-out Date</label>
              <input 
                type="date" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="form-input"
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <button onClick={handleSearch} className="search-btn">
              Search Hotels
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="features-title">Why Choose Brijwasi Hotels?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏨</div>
              <h3 className="feature-title">Premium Locations</h3>
              <p className="feature-description">
                Strategically located in the heart of India's most spiritual and cultural destinations
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3 className="feature-title">Luxury Amenities</h3>
              <p className="feature-description">
                World-class facilities including spa, fine dining, and modern conference rooms
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍽️</div>
              <h3 className="feature-title">Authentic Cuisine</h3>
              <p className="feature-description">
                Experience traditional Indian flavors and international cuisine prepared by expert chefs
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚗</div>
              <h3 className="feature-title">Easy Accessibility</h3>
              <p className="feature-description">
                Convenient transportation links and complimentary airport transfers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">About Brijwasi Group</h2>
            <p className="about-description">
              For over three decades, Brijwasi Group of Hotels has been synonymous with 
              exceptional hospitality and spiritual tourism in India. Our hotels are 
              thoughtfully designed to provide modern comfort while honoring the rich 
              cultural heritage of our sacred destinations.
            </p>
            <p className="about-description">
              From the holy city of Mathura to the bustling streets of Delhi, each of 
              our properties offers a unique blend of traditional Indian hospitality 
              and contemporary luxury amenities.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">30+</div>
                <div className="stat-label">Years of Excellence</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15</div>
                <div className="stat-label">Hotel Properties</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Happy Guests</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Guest Support</div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa" 
              alt="Hotel Lobby" 
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="testimonials-title">What Our Guests Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Exceptional service and beautiful rooms. The location in Vrindavan 
                made our spiritual journey truly memorable. Highly recommended!"
              </p>
              <div className="testimonial-author">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
                  alt="Guest" 
                  className="author-avatar"
                />
                <div className="author-info">
                  <h4>Rajesh Kumar</h4>
                  <p>Delhi, India</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "The perfect blend of modern comfort and traditional hospitality. 
                The staff went above and beyond to make our stay comfortable."
              </p>
              <div className="testimonial-author">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786" 
                  alt="Guest" 
                  className="author-avatar"
                />
                <div className="author-info">
                  <h4>Priya Sharma</h4>
                  <p>Mumbai, India</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Amazing experience! The hotel's proximity to major temples and 
                the quality of service made our pilgrimage truly special."
              </p>
              <div className="testimonial-author">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" 
                  alt="Guest" 
                  className="author-avatar"
                />
                <div className="author-info">
                  <h4>Amit Patel</h4>
                  <p>Ahmedabad, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage;