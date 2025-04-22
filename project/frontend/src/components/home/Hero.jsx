"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

const images = [
  "d-1.jpg",
  "r-1.jpeg",
  "vara.jpg",
  "delhi.jpg",
  "r-1.jpeg",
  "ayo.jpg",
  "p-1.webp"
]

const Hero = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 5000) // change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hero">
      <AnimatePresence mode="wait">
        <motion.div
          key={images[current]}
          className="hero-bg"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${images[current]})`,
          }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Experience Luxury & Comfort
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Discover the perfect blend of elegance and hospitality at Brijwasi Hotel
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut"
        }}
      >
        <span>&#8595;</span>
      </motion.div>

      <style jsx>{`
        .hero {
          position: relative;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fefefe;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-size: cover;
          background-position: center;
          z-index: -1;
        }

        .hero-content {
          z-index: 1;
          max-width: 800px;
          padding: 0 20px;
        }

        .hero h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: #fff9db;
          text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
        }

        .hero p {
          font-size: 1.3rem;
          line-height: 1.6;
          margin-bottom: 40px;
          color: #e0e0e0;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
        }

        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 12px 30px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 30px;
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
        }

        .btn.primary {
          background-color: #FFD700;
          color: #1a202c;
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
        }

        .btn.primary:hover {
          background-color: #f5c400;
        }

        .btn.outline {
          border: 2px solid #fff;
          color: #fff;
          background: transparent;
        }

        .btn.outline:hover {
          background-color: #ffffff22;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2rem;
          color: #fff9db;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.4rem;
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

          .btn {
            width: 100%;
            max-width: 250px;
          }
        }
      `}</style>
    </div>
  )
}

export default Hero
