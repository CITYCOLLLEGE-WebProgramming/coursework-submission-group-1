import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BecomeHost from '../components/BecomeHost';
import 'bootstrap/dist/css/bootstrap.min.css';


const BecomeHostPage = () => {
  return (
    <>
      <Navbar />
        <BecomeHost />
      <Footer />
    </>
  );
};

export default BecomeHostPage;
