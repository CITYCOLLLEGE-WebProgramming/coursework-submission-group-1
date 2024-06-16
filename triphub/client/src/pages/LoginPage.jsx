import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      console.log('Login successful:', response.data);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err.response ? err.response.data : err.message);
      setMessage(err.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <h1>Login</h1>
        {message && <p style={{ color: 'red' }}>{message}</p>}
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Login</button>
        </form>
        <a href="/register">Don't have an account? Register</a>
      </div>
    </div>
  );
};

export default LoginPage;
