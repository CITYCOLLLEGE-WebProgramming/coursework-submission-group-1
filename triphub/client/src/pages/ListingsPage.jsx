import React, { useEffect, useState } from 'react';
import Listings from '../components/Listings';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Listings.css";

const ListingsPage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:3000/listings');
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <Navbar />
      <Listings listings={listings} />
      <Footer />
    </div>
  );
};

export default ListingsPage;
