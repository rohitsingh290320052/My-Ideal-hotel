"use client"

const AboutSection = () => {
  return (
    <section className="section about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <img src="about.jpg" alt="Brijwasi Hotel" />
          </div>

          <div className="about-text">
            <h2>About Brijwasi</h2>
            <p>
              Established in 2005, Brijwasi Hotel has been providing exceptional hospitality services for over 15 years.
              Our commitment to excellence and attention to detail have made us a preferred choice for travelers seeking
              comfort and luxury.
            </p>
            <p>
              Our hotel features elegantly designed rooms, a world-class restaurant serving delicious cuisine, and
              state-of-the-art facilities to ensure a memorable stay for our guests.
            </p>

            <div className="features">
              <div className="feature">
                <h3>Luxurious Rooms</h3>
                <p>Spacious and comfortable rooms with modern amenities</p>
              </div>

              <div className="feature">
                <h3>Fine Dining</h3>
                <p>Exquisite culinary experience with diverse menu options</p>
              </div>

              <div className="feature">
                <h3>Family Friendly</h3>
                <p>Special amenities and services for families with children</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          background-color: #66FFFF;
        }
        
        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }
        
        .about-image img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: var(--box-shadow);
        }
        
        .about-text h2 {
          color: var(--primary-color);
          margin-bottom: 20px;
          font-size: 2rem;
        }
        
        .about-text p {
          margin-bottom: 15px;
          line-height: 1.7;
        }
        
        .features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 30px;
        }
        
        .feature {
          text-align: center;
        }
        
        .feature-icon {
          font-size: 2rem;
          margin-bottom: 10px;
        }
        
        .feature h3 {
          color: var(--primary-color);
          margin-bottom: 10px;
          font-size: 1.1rem;
        }
        
        .feature p {
          font-size: 0.9rem;
          color: #333333;
        }
        
        @media (max-width: 992px) {
          .about-content {
            grid-template-columns: 1fr;
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
            gap: 30px;
          }
        }
      `}</style>
    </section>
  )
}

export default AboutSection

