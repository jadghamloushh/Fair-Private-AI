import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Loan Approval AI</h1>
          <p>
            Empowering fair, private, and secure loan decisions with
            state-of-the-art AI.
          </p>
          <Link to="/apply" className="cta-button">
            Apply Now
          </Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">⚖️</div>
            <h3>Fair Decisions</h3>
            <p>
              Our AI model is built with fairness in mind, reducing bias while
              ensuring optimal decision making.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Data Privacy</h3>
            <p>
              With differential privacy, your sensitive information is always
              protected.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Quick Approval</h3>
            <p>
              Fast and accurate evaluations to get you the funds you need, when
              you need them.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
