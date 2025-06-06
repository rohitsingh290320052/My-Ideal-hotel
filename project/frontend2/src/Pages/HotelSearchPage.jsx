import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './rooms.css'; // Assuming you have a CSS file for styling

const HotelsSearchPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get('city');
    setCity(cityParam);

    if (cityParam) {
      axios
        .get(`http://localhost:3000/hotels/search?city=${encodeURIComponent(cityParam)}`)
        .then((res) => {
          setHotels(res.data.data || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [location.search]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Searching for hotels...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Hotels in {city}</h1>
        <p className="page-subtitle">
          {hotels.length} {hotels.length === 1 ? 'hotel' : 'hotels'} found
        </p>
      </div>
      
      <div className="container">
        {hotels.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🏨</div>
            <h3 className="no-results-title">No hotels found</h3>
            <p className="no-results-text">
              We couldn't find any hotels in {city}. Try searching for a different destination.
            </p>
          </div>
        ) : (
          <ul className="hotels-grid fade-in">
            {hotels.map((hotel) => (
              <li key={hotel._id} className="hotel-card">
                <img 
                  src={hotel.image || "/placeholder.svg?height=250&width=400"} 
                  alt={hotel.name} 
                  className="hotel-image"
                />
                <div className="hotel-content">
                  <h3 className="hotel-name">{hotel.name}</h3>
                  <p className="hotel-description">{hotel.description}</p>
                  <button 
                    className="show-rooms-btn"
                    onClick={() => navigate(`/rooms/${encodeURIComponent(hotel.name)}`)}
                  >
                    View Rooms & Book
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HotelsSearchPage;