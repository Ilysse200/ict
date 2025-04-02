import React from 'react';
import './userStyles/welcome.css';
import { Link } from 'react-router-dom';
const WelcomePage = () => {
  return (
    <section className="hero" id="welcome">
      <h1>Find Your Dream Job</h1>
      <p>
        Join our team and be part of something extraordinary. We're looking for talented individuals
        who are passionate about making a difference.
      </p>
      <Link to='/department'>
      <button className="btn-primary">Apply Now</button>
      </Link>
    </section>
  );
};

export default WelcomePage;