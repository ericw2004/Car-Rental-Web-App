import React from 'react';
import '../styles/About.css';

function About() {
  const creators = [
    {
      name: 'Josh',
      role: 'Full Stack Developer',
      github: 'https://github.com/swanso01',
      bio: 'Frontend architecture and UI/UX implementation'
    },
    {
      name: 'Jerry',
      role: 'Backend Developer',
      github: 'https://github.com/Jerry4424',
      bio: 'Database design and API development'
    },
    {
      name: 'Eric',
      role: 'Full Stack Developer',
      github: 'https://github.com/ericw2004',
      bio: 'Backend optimization and system architecture'
    }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">About CarRental</h1>
          <p className="hero-subtitle">
            A modern, efficient car rental platform built by passionate developers
          </p>
        </div>
        <div className="hero-background"></div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            We created CarRental to revolutionize the car rental experience. 
            Our platform combines cutting-edge technology with user-friendly design 
            to make renting a car simple, affordable, and enjoyable.
          </p>
        </div>
      </section>

      {/* Creators Section */}
      <section className="creators-section">
        <h2 className="section-title">Meet the Team</h2>
        <div className="creators-grid">
          {creators.map((creator, index) => (
            <div key={index} className="creator-card">
              <div className="card-content">
                <h3 className="creator-name">{creator.name}</h3>
                <p className="creator-role">{creator.role}</p>
                <p className="creator-bio">{creator.bio}</p>
                <a 
                  href={creator.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  <span className="github-icon">GitHub</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast Booking</h3>
            <p>Book your car in seconds with our intuitive interface</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Secure Transactions</h3>
            <p>Your data is protected with enterprise-grade security</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Wide Selection</h3>
            <p>Choose from hundreds of vehicles for any occasion</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>24/7 Support</h3>
            <p>Our team is always here to help you</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Rent?</h2>
        <p>Start your journey with CarRental today</p>
        <a href="/cars" className="cta-button">Browse Cars</a>
      </section>
    </div>
  );
}

export default About;
