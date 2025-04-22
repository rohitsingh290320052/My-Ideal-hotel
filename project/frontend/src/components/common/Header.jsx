"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false)
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false)
  const [checkInDate, setCheckInDate] = useState(new Date())
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 86400000)) // Tomorrow
  const [selectedDays, setSelectedDays] = useState(1)
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false)
  const checkInRef = useRef(null)
  const checkOutRef = useRef(null)
  const navigate = useNavigate()

  // Format date for display
  const formatDate = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const day = days[date.getDay()]
    const dateNum = date.getDate()
    const month = months[date.getMonth()]

    return `${day} ${dateNum} ${month}`
  }

  // Calculate number of days between dates
  useEffect(() => {
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    setSelectedDays(daysDiff)
  }, [checkInDate, checkOutDate])

  // Close calendars when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (checkInRef.current && !checkInRef.current.contains(event.target)) {
        setShowCheckInCalendar(false)
      }
      if (checkOutRef.current && !checkOutRef.current.contains(event.target)) {
        setShowCheckOutCalendar(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Smooth scroll animation for search bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsSearchBarVisible(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearch = (e) => {
    e.preventDefault()

    if(!searchQuery.trim()){
      alert("Please enter a destination.")
      return
    }
    navigate(
      `/search?location=${encodeURIComponent(searchQuery)}&checkIn=${checkInDate.toISOString()}&checkOut=${checkOutDate.toISOString()}`,
    )
  }

  const handleDateSelect = (date, isCheckIn) => {
    if (isCheckIn) {
      setCheckInDate(date)

      // If check-out date is before or equal to new check-in date, update it
      if (checkOutDate <= date) {
        const nextDay = new Date(date)
        nextDay.setDate(nextDay.getDate() + 1)
        setCheckOutDate(nextDay)
      }

      // After selecting check-in date, show check-out calendar
      setShowCheckInCalendar(false)
      setShowCheckOutCalendar(true)
    } else {
      setCheckOutDate(date)
      setShowCheckOutCalendar(false)
    }
  }

  // Generate calendar days
  const generateCalendarDays = (currentDate, isCheckIn) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      const isToday = date.getTime() === today.getTime()
      const isSelected = isCheckIn
        ? date.getTime() === checkInDate.getTime()
        : date.getTime() === checkOutDate.getTime()
      const isPast = date < today
      const isCheckInDate = date.getTime() === checkInDate.getTime()
      const isCheckOutDate = date.getTime() === checkOutDate.getTime()
      const isInRange = date > checkInDate && date < checkOutDate

      // Disable past dates for check-in and dates before check-in for check-out
      const isDisabled = isCheckIn ? isPast : date < checkInDate

      days.push(
        <div
          key={i}
          className={`calendar-day ${isToday ? "today" : ""} ${isSelected ? "selected" : ""} 
                     ${isDisabled ? "disabled" : ""} ${isCheckInDate ? "check-in" : ""} 
                     ${isCheckOutDate ? "check-out" : ""} ${isInRange ? "in-range" : ""}`}
          onClick={() => !isDisabled && handleDateSelect(date, isCheckIn)}
        >
          {i}
        </div>,
      )
    }

    return days
  }

  // Navigate to previous/next month
  const [checkInViewDate, setCheckInViewDate] = useState(new Date())
  const [checkOutViewDate, setCheckOutViewDate] = useState(new Date())

  const changeMonth = (increment, isCheckIn) => {
    if (isCheckIn) {
      const newDate = new Date(checkInViewDate)
      newDate.setMonth(newDate.getMonth() + increment)
      setCheckInViewDate(newDate)
    } else {
      const newDate = new Date(checkOutViewDate)
      newDate.setMonth(newDate.getMonth() + increment)
      setCheckOutViewDate(newDate)
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <h1>Brijwasi</h1>
              <h5>Hotels & Restaurants</h5>
            </Link>
          </div>
  
          <div className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
  
          <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login" className="btn btn-sm">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
  
      <div className={`search-bar-container ${isSearchBarVisible ? 'visible' : ''}`}>
        <div className="container">
          <form onSubmit={handleSearch} className="search-bar">
            {/* Search Input */}
            <div className="search-input">
              <input
                type="text"
                placeholder="Where are you going? Destination or hotel"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
  
            {/* Check-in Picker */}
            <div className="date-picker" ref={checkInRef}>
              <div
                className="date-picker-display"
                onClick={() => {
                  setShowCheckInCalendar(!showCheckInCalendar);
                  setShowCheckOutCalendar(false);
                  setCheckInViewDate(new Date(checkInDate));
                }}
              >
                <span className="date-icon">🗓️</span>
                <div className="date-label">
                  <span>Check-in</span>
                  <strong>{formatDate(checkInDate)}</strong>
                </div>
                <span className="dropdown-arrow">▼</span>
              </div>
  
              {showCheckInCalendar && (
                <div className="calendar-dropdown">
                  <div className="calendar-header">
                    <button
                      className="month-nav prev"
                      onClick={() => changeMonth(-1, true)}
                      type="button"
                    >
                      &lt;
                    </button>
                    <h4>
                      {checkInViewDate.toLocaleString("default", {
                        month: "long",
                      })}{" "}
                      {checkInViewDate.getFullYear()}
                    </h4>
                    <button
                      className="month-nav next"
                      onClick={() => changeMonth(1, true)}
                      type="button"
                    >
                      &gt;
                    </button>
                  </div>
                  <div className="calendar-weekdays">
                    <div>Su</div>
                    <div>Mo</div>
                    <div>Tu</div>
                    <div>We</div>
                    <div>Th</div>
                    <div>Fr</div>
                    <div>Sa</div>
                  </div>
                  <div className="calendar-days">
                    {generateCalendarDays(checkInViewDate, true)}
                  </div>
                  <div className="calendar-footer">
                    <p>Select your check-in date</p>
                  </div>
                </div>
              )}
            </div>
  
            {/* Check-out Picker */}
            <div className="date-picker" ref={checkOutRef}>
              <div
                className="date-picker-display"
                onClick={() => {
                  setShowCheckOutCalendar(!showCheckOutCalendar);
                  setShowCheckInCalendar(false);
                  setCheckOutViewDate(new Date(checkOutDate));
                }}
              >
                <span className="date-icon">🗓️</span>
                <div className="date-label">
                  <span>
                    Check-out ({selectedDays} {selectedDays === 1 ? "night" : "nights"})
                  </span>
                  <strong>{formatDate(checkOutDate)}</strong>
                </div>
                <span className="dropdown-arrow">▼</span>
              </div>
  
              {showCheckOutCalendar && (
                <div className="calendar-dropdown">
                  <div className="calendar-header">
                    <button
                      className="month-nav prev"
                      onClick={() => changeMonth(-1, false)}
                      type="button"
                    >
                      &lt;
                    </button>
                    <h4>
                      {checkOutViewDate.toLocaleString("default", {
                        month: "long",
                      })}{" "}
                      {checkOutViewDate.getFullYear()}
                    </h4>
                    <button
                      className="month-nav next"
                      onClick={() => changeMonth(1, false)}
                      type="button"
                    >
                      &gt;
                    </button>
                  </div>
                  <div className="calendar-weekdays">
                    <div>Su</div>
                    <div>Mo</div>
                    <div>Tu</div>
                    <div>We</div>
                    <div>Th</div>
                    <div>Fr</div>
                    <div>Sa</div>
                  </div>
                  <div className="calendar-days">
                    {generateCalendarDays(checkOutViewDate, false)}
                  </div>
                  <div className="calendar-footer">
                    <p>Select your check-out date</p>
                  </div>
                </div>
              )}
            </div>
  
            {/* Submit Button */}
            <button type="submit" className="search-button">
              SEARCH
            </button>
          </form>
        </div>
      </div>
      
      <style jsx>{`
        .header {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 999;
          transition: all 0.3s ease;
        }
        
        .header:hover {
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          animation: fadeIn 0.6s ease;
        }
        
        .logo {
          transition: transform 0.3s ease;
        }
        
        .logo:hover {
          transform: scale(1.05);
        }
        
        .logo h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2c3e50;
          margin: 0;
          background: linear-gradient(45deg, #2c3e50, #3498db);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: slideInLeft 0.8s ease;
        }
        
        .logo h5 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #546e7a;
          margin: 0;
          opacity: 0.9;
          animation: slideInLeft 0.8s ease 0.2s backwards;
        }
        
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        
        .mobile-menu-btn:hover {
          transform: scale(1.1);
        }
        
        .mobile-menu-btn.active {
          transform: rotate(90deg);
        }
        
        .mobile-menu-btn span {
          width: 26px;
          height: 3px;
          background-color: #2c3e50;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
          opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }
        
        nav.nav {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 1rem 0;
        }
        
        .nav-links {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }
        
        .nav-links li {
          display: flex;
          align-items: center;
          animation: fadeInUp 0.5s ease backwards;
        }
        
        .nav-links li:nth-child(1) {
          animation-delay: 0.2s;
        }
        
        .nav-links li:nth-child(2) {
          animation-delay: 0.4s;
        }
        
        .nav-links li a {
          text-decoration: none;
          color: #2c3e50;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        }
        
        .nav-links li a:hover {
          color: #3498db;
          transform: translateY(-2px);
        }
        
        .nav-links li a::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #3498db;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        
        .nav-links li a:hover::before {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        .btn-sm {
          padding: 0.6rem 1.4rem;
          background: linear-gradient(45deg, #3498db, #2980b9);
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        }
        
        .btn-sm:hover {
          background: linear-gradient(45deg, #2980b9, #2471a3);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
        }
        
        .search-bar-container {
          background: rgba(255, 255, 255, 0.95);
          padding: 1.5rem 0;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0);
          opacity: 1;
        }
        
        .search-bar-container.visible {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          z-index: 998;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          animation: slideDown 0.4s ease;
        }
        
        .search-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          align-items: center;
          justify-content: space-between;
          animation: fadeInUp 0.6s ease 0.3s backwards;
        }
        
        .search-input input {
          padding: 0.9rem 1.5rem;
          font-size: 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          outline: none;
          width: 350px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.9);
        }
        
        .search-input input:focus {
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
          transform: translateY(-2px);
        }
        
        .search-input input::placeholder {
          color: #a0a0a0;
          transition: opacity 0.3s ease;
        }
        
        .search-input input:focus::placeholder {
          opacity: 0.7;
        }
        
        .search-button {
          padding: 0.9rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          background: linear-gradient(45deg, #3498db, #2980b9);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .search-button:hover {
          background: linear-gradient(45deg, #2980b9, #2471a3);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
        }
        
        .search-button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300%;
          height: 300%;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.5s ease;
        }
        
        .search-button:active::after {
          transform: translate(-50%, -50%) scale(1);
          transition: transform 0s;
        }
        
        .date-picker {
          position: relative;
        }
        
        .date-picker-display {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: rgba(255, 255, 255, 0.9);
          padding: 0.8rem 1.4rem;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 200px;
        }
        
        .date-picker-display:hover {
          border-color: #3498db;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .date-icon {
          font-size: 1.3rem;
          transition: transform 0.3s ease;
        }
        
        .date-picker-display:hover .date-icon {
          transform: scale(1.2);
        }
        
        .date-label {
          display: flex;
          flex-direction: column;
          font-size: 0.9rem;
          color: #333;
        }
        
        .date-label span {
          color: #666;
          font-size: 0.8rem;
        }
        
        .date-label strong {
          color: #2c3e50;
          font-size: 1rem;
          font-weight: 600;
        }
        
        .dropdown-arrow {
          margin-left: auto;
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }
        
        .date-picker-display:hover .dropdown-arrow {
          transform: translateY(2px);
        }
        
        .calendar-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 100;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 16px;
          padding: 1.2rem;
          margin-top: 0.8rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          width: 340px;
          animation: fadeInUp 0.3s ease;
        }
        
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding: 0.5rem;
        }
        
        .calendar-header h4 {
          font-weight: 600;
          font-size: 1.1rem;
          color: #2c3e50;
        }
        
        .month-nav {
          background: none;
          border: none;
          font-size: 1.2rem;
          color: #3498db;
          cursor: pointer;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .month-nav:hover {
          background: rgba(52, 152, 219, 0.1);
          transform: scale(1.1);
        }
        
        .calendar-weekdays,
        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          gap: 0.5rem;
        }
        
        .calendar-weekdays div {
          font-weight: 600;
          color: #777;
          font-size: 0.85rem;
          padding: 0.5rem 0;
        }
        
        .calendar-day {
          padding: 0.7rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          cursor: pointer;
          position: relative;
          font-weight: 500;
        }
        
        .calendar-day:hover:not(.disabled) {
          background: rgba(52, 152, 219, 0.1);
          transform: scale(1.1);
        }
        
        .calendar-day.today {
          font-weight: 700;
          color: #2c3e50;
        }
        
        .calendar-day.today::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: #3498db;
          border-radius: 50%;
        }
        
        .calendar-day.selected {
          background: #3498db;
          color: white;
          font-weight: 600;
        }
        
        .calendar-day.disabled {
          color: #ccc;
          cursor: not-allowed;
          opacity: 0.5;
        }
        
        .calendar-day.in-range {
          background: rgba(52, 152, 219, 0.1);
        }
        
        .calendar-day.check-in,
        .calendar-day.check-out {
          background: #3498db;
          color: white;
        }
        
        .calendar-footer {
          margin-top: 1rem;
          font-size: 0.9rem;
          color: #666;
          text-align: center;
          padding: 0.5rem;
          border-top: 1px solid #eee;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media screen and (max-width: 768px) {
          .mobile-menu-btn {
            display: flex;
          }
          
          nav.nav {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            flex-direction: column;
            padding: 1.5rem 0;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            animation: slideDown 0.3s ease;
          }
          
          nav.nav.active {
            display: flex;
          }
          
          .nav-links {
            flex-direction: column;
            gap: 1rem;
          }
          
          .search-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
            padding: 0 1rem;
          }
          
          .search-input input,
          .search-button {
            width: 100%;
          }
          
          .date-picker-display {
            width: 100%;
          }
          
          .calendar-dropdown {
            width: calc(100% - 2rem);
            left: 1rem;
            right: 1rem;
          }
        }
      `}</style>
    </header>
  );
}

export default Header