import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './rooms.css';

const RoomsPage = () => {
  const { hotelName } = useParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingMsg, setBookingMsg] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [dates, setDates] = useState({});

  const guestId = localStorage.getItem('guestId');

  useEffect(() => {
    axios.get(`http://localhost:3000/room/${encodeURIComponent(hotelName)}`)
      .then(res => {
        setRooms(res.data.rooms || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [hotelName]);

  const handleDateChange = (roomId, field, value) => {
    setDates(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        [field]: value
      }
    }));
  };

  const handleBookNow = async (roomId) => {
    const checkInDate = dates[roomId]?.checkIn;
    const checkOutDate = dates[roomId]?.checkOut;
    const token = localStorage.getItem('token');

    if (!guestId) {
      setBookingMsg('Please log in to book a room.');
      setBookingDetails(null);
      return;
    }
    if (!checkInDate || !checkOutDate) {
      setBookingMsg('Please select both check-in and check-out dates.');
      setBookingDetails(null);
      return;
    }
    if (!token) {
      setBookingMsg('No token found. Please log in again.');
      setBookingDetails(null);
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:3000/booking/create',
        { roomId, guestId, checkInDate, checkOutDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setBookingMsg('Booking successful!');
      setBookingDetails(res.data);
    } catch (error) {
      setBookingMsg(
        error.response?.data?.message || 'Booking failed. Please try again.'
      );
      setBookingDetails(null);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading rooms...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Rooms at {hotelName}</h1>
        <p className="page-subtitle">Choose your perfect accommodation</p>
      </div>

      <div className="rooms-container">
        {bookingMsg && (
          <div className={`booking-message ${bookingDetails ? '' : 'error'} fade-in`}>
            <strong>{bookingMsg}</strong>
            {bookingDetails && (
              <div className="booking-details">
                <div>Booking ID: {bookingDetails.bookingId}</div>
                <div>Room ID: {bookingDetails.roomId}</div>
                <div>Guest ID: {bookingDetails.guestId}</div>
                <div>Duration: {bookingDetails.days} days</div>
                <div>Total Amount: ₹{bookingDetails.totalAmount}</div>
              </div>
            )}
          </div>
        )}

        {rooms.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🛏️</div>
            <h3 className="no-results-title">No rooms available</h3>
            <p className="no-results-text">
              No rooms found for this hotel. Please try again later.
            </p>
          </div>
        ) : (
          <ul className="rooms-grid fade-in">
            {rooms.map((room, idx) => (
              <li key={idx} className="room-card">
                <img 
                  src={room.photos?.[0] || "/placeholder.svg?height=250&width=400"} 
                  alt={`${room.BedType} Room`} 
                  className="room-image"
                />
                <div className="room-content">
                  <div className="room-header">
                    <h3 className="room-type">{room.BedType} Room</h3>
                    <div className="room-price">
                      ₹{room.price}
                      <div className="room-price-label">per night</div>
                    </div>
                  </div>

                  <div className="room-details">
                    <div className="room-detail-item">
                      <span className="room-detail-icon">👥</span>
                      <span>Capacity: {room.capacity}</span>
                    </div>
                    <div className="room-detail-item">
                      <span className="room-detail-icon">🛏️</span>
                      <span>{room.BedType} Bed</span>
                    </div>
                  </div>

                  <p className="room-description">{room.description}</p>

                  <div className="room-amenities">
                    <div className="amenities-title">Amenities</div>
                    <div className="amenities-list">
                      {room.amenities?.map((amenity, i) => (
                        <span key={i} className="amenity-tag">{amenity}</span>
                      ))}
                    </div>
                  </div>

                  <div className="booking-section">
                    <div className="date-inputs">
                      <div className="date-group">
                        <label className="date-label">Check-in Date</label>
                        <input
                          type="date"
                          className="date-input"
                          value={dates[room._id]?.checkIn || ''}
                          onChange={e => handleDateChange(room._id, 'checkIn', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="date-group">
                        <label className="date-label">Check-out Date</label>
                        <input
                          type="date"
                          className="date-input"
                          value={dates[room._id]?.checkOut || ''}
                          onChange={e => handleDateChange(room._id, 'checkOut', e.target.value)}
                          min={dates[room._id]?.checkIn || new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    <button 
                      className="book-now-btn"
                      onClick={() => handleBookNow(room._id)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RoomsPage;