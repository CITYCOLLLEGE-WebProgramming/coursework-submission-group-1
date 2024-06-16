import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ListingDetails.css';

const ListingDetails = () => {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/listings/${listingId}`);
        setListing(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch listing details');
        setLoading(false);
        console.error('API call error:', error);
      }
    };

    fetchListing();
  }, [listingId]);

  if (!listing) return <div>No listing found</div>;

  return (
    <div className="listing-details">
      <h1 className="listing-title">{listing.title}</h1>
      <p className="listing-description">{listing.description}</p>
      <div className="listing-info">
        <p><strong>Street Address:</strong> {listing.streetAddress}</p>
        <p><strong>City:</strong> {listing.city}</p>
        <p><strong>Country:</strong> {listing.country}</p>
        <p><strong>Bed Count:</strong> {listing.bedCount}</p>
        <p><strong>Bathroom Count:</strong> {listing.bathroomCount}</p>
        <p><strong>Amenities:</strong> {listing.amenities.join(', ')}</p>
        <p><strong>Price:</strong> ${listing.price}</p>
      </div>
      <div className="listing-photos">
        {listing.listingPhotoPaths.map((photo, index) => (
          <img key={index} src={photo} alt={`Listing photo ${index + 1}`} />
        ))}
      </div>
        <button className="i-want-it-button">I want it!</button>
    </div>
  );
};

export default ListingDetails;
