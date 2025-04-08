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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearch = (e) => {
    e.preventDefault()
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
            </Link>
          </div>

          <div className="mobile-menu-btn" onClick={toggleMenu}>
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

      <div className="search-bar-container">
        <div className="container">
          <form onSubmit={handleSearch} className="search-bar">
            <div className="search-input">
              <input
                type="text"
                placeholder="Where are you going? Destination or hotel"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="date-picker" ref={checkInRef}>
              <div
                className="date-picker-display"
                onClick={() => {
                  setShowCheckInCalendar(!showCheckInCalendar)
                  setShowCheckOutCalendar(false)
                  setCheckInViewDate(new Date(checkInDate))
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
                    <button className="month-nav prev" onClick={() => changeMonth(-1, true)} type="button">
                      &lt;
                    </button>
                    <h4>
                      {checkInViewDate.toLocaleString("default", { month: "long" })} {checkInViewDate.getFullYear()}
                    </h4>
                    <button className="month-nav next" onClick={() => changeMonth(1, true)} type="button">
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
                  <div className="calendar-days">{generateCalendarDays(checkInViewDate, true)}</div>
                  <div className="calendar-footer">
                    <p>Select your check-in date</p>
                  </div>
                </div>
              )}
            </div>

            <div className="date-picker" ref={checkOutRef}>
              <div
                className="date-picker-display"
                onClick={() => {
                  setShowCheckOutCalendar(!showCheckOutCalendar)
                  setShowCheckInCalendar(false)
                  setCheckOutViewDate(new Date(checkOutDate))
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
                    <button className="month-nav prev" onClick={() => changeMonth(-1, false)} type="button">
                      &lt;
                    </button>
                    <h4>
                      {checkOutViewDate.toLocaleString("default", { month: "long" })} {checkOutViewDate.getFullYear()}
                    </h4>
                    <button className="month-nav next" onClick={() => changeMonth(1, false)} type="button">
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
                  <div className="calendar-days">{generateCalendarDays(checkOutViewDate, false)}</div>
                  <div className="calendar-footer">
                    <p>Select your check-out date</p>
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="search-button">
              SEARCH
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .header {
          background-color: var(--dark-bg);
          position: sticky;
          top: 0;
          z-index: 100;
          padding-bottom: 15px;
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
        }

        .logo {
          display: flex;
          align-items: center;
        }
        
        .logo h1 {
          color: var(--white);
          font-size: 1.8rem;
        }
        
        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }
        
        .nav-links li a {
          color: var(--white);
          font-weight: 500;
          transition: var(--transition);
        }
        
        .nav-links li a:hover {
          color: var(--secondary-color);
        }
        
        .btn-sm {
          padding: 8px 16px;
          font-size: 0.9rem;
          background-color: var(--secondary-color);
          color: var(--dark-bg) !important;
        }
        
        .btn-sm:hover {
          background-color: #d1a55e;
          color: var(--dark-bg) !important;
        }
        
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
        }
        
        .mobile-menu-btn span {
          display: block;
          width: 25px;
          height: 3px;
          background-color: var(--white);
          transition: var(--transition);
        }

        .search-bar-container {
          width: 100%;
        }

        .search-bar {
          display: flex;
          background-color: var(--white);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .search-input {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 0 15px;
          border-right: 1px solid #e2e8f0;
        }

        .search-icon {
          margin-right: 10px;
          font-size: 1.2rem;
        }

        .search-input input {
          width: 100%;
          padding: 15px 0;
          border: none;
          font-size: 1rem;
        }

        .search-input input:focus {
          outline: none;
        }

        .date-picker {
          position: relative;
          display: flex;
          align-items: center;
          padding: 0 15px;
          border-right: 1px solid #e2e8f0;
          cursor: pointer;
          min-width: 150px;
        }

        .date-picker-display {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 15px 0;
        }

        .date-icon {
          margin-right: 10px;
          font-size: 1.2rem;
        }

        .date-label {
          display: flex;
          flex-direction: column;
          margin-right: 10px;
        }

        .date-label span {
          font-size: 0.8rem;
          color: var(--gray);
        }

        .date-label strong {
          font-size: 0.9rem;
        }

        .dropdown-arrow {
          font-size: 0.7rem;
          color: var(--gray);
        }

        .calendar-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          width: 300px;
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 10;
          padding: 15px;
          margin-top: 5px;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .calendar-header h4 {
          color: var(--primary-color);
          font-size: 1rem;
        }

        .month-nav {
          background: none;
          border: none;
          color: var(--primary-color);
          font-size: 1.2rem;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 4px;
        }

        .month-nav:hover {
          background-color: #f1f5f9;
        }

        .calendar-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
          text-align: center;
          margin-bottom: 10px;
        }

        .calendar-weekdays div {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--gray);
        }

        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
        }

        .calendar-day {
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          border-radius: 50%;
          cursor: pointer;
          transition: var(--transition);
        }

        .calendar-day:hover:not(.empty):not(.disabled) {
          background-color: #f1f5f9;
        }

        .calendar-day.empty {
          cursor: default;
        }

        .calendar-day.today {
          border: 1px solid var(--primary-color);
        }

        .calendar-day.selected {
          background-color: var(--primary-color);
          color: var(--white);
        }

        .calendar-day.disabled {
          color: #cbd5e0;
          cursor: not-allowed;
        }

        .calendar-day.check-in {
          background-color: var(--primary-color);
          color: var(--white);
          border-radius: 50% 0 0 50%;
        }

        .calendar-day.check-out {
          background-color: var(--primary-color);
          color: var(--white);
          border-radius: 0 50% 50% 0;
        }

        .calendar-day.in-range {
          background-color: rgba(26, 54, 93, 0.1);
        }

        .calendar-footer {
          margin-top: 10px;
          text-align: center;
          font-size: 0.8rem;
          color: var(--gray);
        }

        .search-button {
          background-color: #d32f2f;
          color: white;
          border: none;
          padding: 0 30px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s;
        }

        .search-button:hover {
          background-color: #b71c1c;
        }

        .search-button-icon {
          margin-right: 8px;
        }
        
        @media (max-width: 992px) {
          .search-bar {
            flex-direction: column;
          }
          
          .search-input, .date-picker {
            border-right: none;
            border-bottom: 1px solid #e2e8f0;
            width: 100%;
          }
          
          .search-button {
            padding: 15px;
          }

          .calendar-dropdown {
            width: 100%;
          }
        }
        
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex;
          }
          
          .nav {
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background-color: var(--dark-bg);
            padding: 20px;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
            transform: translateY(-150%);
            transition: var(--transition);
          }
          
          .nav.active {
            transform: translateY(0);
          }
          
          .nav-links {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
    </header>
  )
}

export default Header
