import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Slide.css';

const Slide = () => {
  return (
    <div className="slide">
      <img src="../assets/home.jpg" alt="Slide" />
      <div className="slide-content">
        <h2>Welcome to TripHub!</h2>
        <p>Find the perfect place to stay</p>
        <div className="slide-buttons">
          <Link to="/listings">
            <button className="view-all-rooms">View Rooms</button>
          </Link>
          <Link to="/become-host">
            <button className="become-host">Become Host</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
