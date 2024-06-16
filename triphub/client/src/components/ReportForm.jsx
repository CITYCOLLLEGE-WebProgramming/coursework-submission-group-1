import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ReportForm.css';

const ReportForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [problemType, setProblemType] = useState('');
  const [file, setFile] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('problemType', problemType);
    if (file) formData.append('file', file);
    formData.append('termsAccepted', termsAccepted);

    try {
      const res = await axios.post('http://localhost:3000/api/report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMessage('Report submitted successfully!');
      setErrorMessage('');
      console.log(res.data);
    } catch (error) {
      setErrorMessage('Error submitting the form');
      setSuccessMessage('');
      console.error('Error submitting the form', error);
    }
  };

  return (
    <div className="report">
      <div className="report_content">
        <h2>Report a Problem</h2>
        {successMessage && <p className="success_message">{successMessage}</p>}
        {errorMessage && <p className="error_message">{errorMessage}</p>}
        <form className="report_content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            name="description"
            placeholder="Describe the problem"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="text"
            name="problemType"
            placeholder="Problem Type"
            required
            value={problemType}
            onChange={(e) => setProblemType(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            Accept Terms and Conditions
          </label>
          <button type="submit" className="report_button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
