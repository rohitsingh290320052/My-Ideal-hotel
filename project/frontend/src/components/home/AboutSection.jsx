"use client";
import { useState, useEffect, useRef } from 'react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="section about-section" ref={sectionRef}>
      <div className="container">
        <div className={`about-content ${isVisible ? 'animate-in' : ''}`}>
          <div className="about-image">
            <div className="image-container">
              <img src="about.jpg" alt="Brijwasi Hotel" />
            </div>
          </div>
          <div className="about-text">
            <h2 className="section-title">
              <span>About</span>
              <span className="highlight">Brijwasi</span>
            </h2>
            <p className="description">
              Established in 2005, Brijwasi Hotel has been providing exceptional hospitality services for over 15 years. Our commitment to excellence and attention to detail have made us a preferred choice for travelers seeking comfort and luxury.
            </p>
            <p className="description">
              Our hotel features elegantly designed rooms, a world-class restaurant serving delicious cuisine, and state-of-the-art facilities to ensure a memorable stay for our guests.
            </p>
            <div className="features">
              <div className="feature" >
                <h3>Luxurious Rooms</h3>
                <p>Spacious and comfortable rooms with modern amenities</p>
              </div>
              <div className="feature" >
                <h3>Fine Dining</h3>
                <p>Exquisite culinary experience with diverse menu options</p>
              </div>
              <div className="feature" >
                <h3>Family Friendly</h3>
                <p>Special amenities and services for families with children</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .about-section {
          background: linear-gradient( #f5f7fa, #e4e9f2);
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }

        .container {
          position: relative;
          z-index: 2;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        .about-content.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .about-image {
          transform: translateX(-50px);
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-in .about-image {
          transform: translateX(0);
          opacity: 1;
        }

        .image-container {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          transition: transform 0.4s ease;
        }

        .image-container:hover {
          transform: scale(1.02) rotate(1deg);
        }

        .about-image img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.6s ease;
        }

        .image-container:hover img {
          transform: scale(1.1);
        }

        .about-text {
          transform: translateX(50px);
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
        }

        .animate-in .about-text {
          transform: translateX(0);
          opacity: 1;
        }

        .section-title {
          font-size: 2.5rem;
          color: #2d3748;
          margin-bottom: 25px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .section-title .highlight {
          color: #00acc1;
          position: relative;
        }

        .section-title .highlight::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: #66ffff;
          transform: scaleX(0);
          transition: transform 0.5s ease 0.5s;
        }

        .animate-in .section-title .highlight::after {
          transform: scaleX(1);
        }

        .description {
          color: #4a5568;
          line-height: 1.8;
          margin-bottom: 20px;
          font-size: 1.1rem;
        }

        .features {
          display: grid; 
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 40px;
        }

        .feature {
          text-align: center;
          padding: 25px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          transform: translateY(20px);
          opacity: 0;
        }

        .animate-in .feature {
          animation: fadeInUp 0.6s ease forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #66ffff, #00acc1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: transform 0.3s ease;
        }

        .feature:hover .feature-icon {
          transform: scale(1.1) rotate(10deg);
        }

        .feature h3 {
          color: #2d3748;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .feature p {
          color: #718096;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        @media (max-width: 992px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .about-image,
          .about-text {
            transform: none;
          }

          .about-image {
            order: 2;
          }

          .about-text {
            order: 1;
          }
        }

        @media (max-width: 768px) {
          .features {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .about-section {
            padding: 60px 0;
          }

          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;