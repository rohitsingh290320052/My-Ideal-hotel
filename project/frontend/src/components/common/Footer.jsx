"use client"

import { Link } from "react-router-dom"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Brijwasi Hotel & Restaurant</h3>
            <p>
              Experience luxury and comfort at its finest. Our hotel offers the perfect blend of elegance, convenience,
              and exceptional service.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/rooms">Rooms</Link>
              </li>
              <li>
                <Link to="/restaurant">Restaurant</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>FMRF+FCQ, and, Bhuteshwar Rd, near New Bus Stand, near New Railway Station, Adarsh Nagar, Manoharpura, Mathura, Uttar Pradesh 281001</p>
            <p>Phone: +91 9854845925</p>
            <p>Email: info@brijwasi.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Brijwasi Hotel. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--dark-bg);
          color: var(--white);
          padding: 60px 0 20px;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }
        
        .footer-section h3 {
          color: var(--secondary-color);
          margin-bottom: 20px;
          font-size: 1.2rem;
        }
        
        .footer-section p {
          margin-bottom: 10px;
          color: #cbd5e0;
        }
        
        .footer-section ul li {
          margin-bottom: 10px;
        }
        
        .footer-section ul li a {
          color: #cbd5e0;
          transition: var(--transition);
        }
        
        .footer-section ul li a:hover {
          color: var(--secondary-color);
        }
        
        .footer-bottom {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #4a5568;
        }
      `}</style>
    </footer>
  )
}

export default Footer

