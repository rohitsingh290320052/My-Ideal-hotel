"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
}

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const sections = [
    {
      title: "Brijwasi Hotel & Restaurant",
      content: (
        <p>
          Experience luxury and comfort at its finest. Our hotel offers the perfect blend of elegance, convenience,
          and exceptional service.
        </p>
      ),
    },
    {
      title: "Quick Links",
      content: (
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/rooms">Rooms</Link></li>
          <li><Link to="/restaurant">Restaurant</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      ),
    },
    {
      title: "Our Branches",
      content: (
        <ul>
          <li><p>Delhi</p></li>
          <li><p>Mathura</p></li>
          <li><p>Ayodhya</p></li>
          <li><p>Varanasi</p></li>
          <li><p>Haridwar</p></li>
          <li><p>Puri</p></li>
        </ul>
      ),
    },
    {
      title: "Contact Us",
      content: (
        <>
          <p>FMRF+FCQ, and, Bhuteshwar Rd, near New Bus Stand, near New Railway Station, Adarsh Nagar, Manoharpura, Mathura, Uttar Pradesh 281001</p>
          <p>Phone: +91 9854845925</p>
          <p>Email: info@brijwasi.com</p>
        </>
      ),
    },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {sections.map((section, i) => (
            <motion.div
              className="footer-section"
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <h3>{section.title}</h3>
              {section.content}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} Brijwasi Hotel. All rights reserved.</p>
        </motion.div>
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
          color: #cbd5e0;
        }
      `}</style>
    </footer>
  )
}

export default Footer
