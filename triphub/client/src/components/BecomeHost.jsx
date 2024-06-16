import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "../styles/BecomeHost.css";

const BecomeHost = () => {
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [bedCount, setBedCount] = useState("");
  const [bathroomCount, setBathroomCount] = useState("");
  const [amenities, setAmenities] = useState("");
  const [listingPhotos, setListingPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setListingPhotos(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("streetAddress", streetAddress);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("bedCount", bedCount);
    formData.append("bathroomCount", bathroomCount);
    formData.append("amenities", amenities);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    for (let i = 0; i < listingPhotos.length; i++) {
      formData.append("listingPhotos", listingPhotos[i]);
    }

    try {
      const response = await fetch("http://localhost:3000/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("Listing created successfully!");
        setErrorMessage("");
        setStreetAddress("");
        setCity("");
        setCountry("");
        setBedCount("");
        setBathroomCount("");
        setAmenities("");
        setListingPhotos([]);
        setTitle("");
        setDescription("");
        setPrice("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to create listing.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <Container fluid className="d-flex flex-column min-vh-100">
      <Row className="flex-grow-1 d-flex justify-content-center align-items-center my-5">
        <Col xs={12} md={8} lg={4}>
          <div className="become-host_content p-4 ">
            <h1 className="text-center mb-4">Become a Host</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formStreetAddress" className="mb-3">
                <Form.Control type="text" name="streetAddress" placeholder="Street Address" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formCity" className="mb-3">
                <Form.Control type="text" name="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formCountry" className="mb-3">
                <Form.Control type="text" name="country" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formBedCount" className="mb-3">
                <Form.Control type="number" name="bedCount" placeholder="Number of Beds" value={bedCount} onChange={(e) => setBedCount(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formBathroomCount" className="mb-3">
                <Form.Control type="number" name="bathroomCount" placeholder="Number of Bathrooms" value={bathroomCount} onChange={(e) => setBathroomCount(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formAmenities" className="mb-3">
                <Form.Control type="text" name="amenities" placeholder="Amenities (comma separated)" value={amenities} onChange={(e) => setAmenities(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formListingPhotos" className="mb-3">
                <Form.Control type="file" name="listingPhotos" multiple onChange={handleFileChange} />
              </Form.Group>
              <Form.Group controlId="formTitle" className="mb-3">
                <Form.Control type="text" name="title" placeholder="Listing Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Control as="textarea" name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formPrice" className="mb-3">
                <Form.Control type="number" name="price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </Form.Group>
              <Button type="submit" className="w-100">
                Submit
              </Button>
            </Form>
            {successMessage && (
              <Alert variant="success" className="mt-3">
                {successMessage}
              </Alert>
            )}
            {errorMessage && (
              <Alert variant="danger" className="mt-3">
                {errorMessage}
              </Alert>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BecomeHost;
