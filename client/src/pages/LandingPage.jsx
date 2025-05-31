import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const LandingPage = () => {
  return (
    <section className="landing-hero">
      <div className="landing-hero-bg">
        <div className="container landing-hero-content">
          <h1 className="landing-title">Welcome to EnlightenIt Hub</h1>
          <p className="landing-subtitle">
            Share your knowledge, discover new ideas, and connect with a vibrant community of creators.
          </p>
          <div className="landing-cta">
            <Link to="/register" className="btn primary landing-btn">Get Started</Link>
            <Link to="/home" className="btn secondary landing-btn">Explore Posts</Link>
          </div>
        </div>
      </div>
      <section className="landing-features container">
        <div className="feature-card">
          <h3>📝 Create & Share</h3>
          <p>Write articles, share insights, and inspire others with your expertise.</p>
        </div>
        <div className="feature-card">
          <h3>🌐 Discover Authors</h3>
          <p>Follow your favorite creators and explore trending topics in every field.</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Secure & Friendly</h3>
          <p>Enjoy a safe, welcoming space to learn, grow, and connect.</p>
        </div>
      </section>
    </section>
  );
};

export default LandingPage;
