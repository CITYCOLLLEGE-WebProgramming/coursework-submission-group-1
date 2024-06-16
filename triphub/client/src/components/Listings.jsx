import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Listings.css";

const Listings = ({ listings }) => {
  const handleImageError = (e) => {
    if (!e.target.dataset.error) {
      e.target.dataset.error = "true"; 
      e.target.src = "/assets/errorImage.png";  
      console.error(`Failed to load image: ${e.target.src}`);
    }
  };

  return (
    <div className="listings-page">
      <h1>Listings</h1>
      <div className="listings">
        {listings.map(listing => (
          <div key={listing._id} className="listing">
            <img 
              src={`http://localhost:3000/${listing.listingPhotoPaths[0]}`} 
              alt={listing.title} 
              onError={handleImageError}
            />
            <h2>{listing.title}</h2>
            <Link to={`/listings/${listing._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
