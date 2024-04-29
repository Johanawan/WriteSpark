import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing">
      <div className="hero-section">
        <h1>Welcome to WriteSpark</h1>
        <p>Empower your writing with AI-driven insights.</p>
        <Link to="/create" className="cta-button">
          Get Started
        </Link>{" "}
      </div>
    </div>
  );
}

export default Landing;
