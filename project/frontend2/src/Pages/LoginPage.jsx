import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [formdata, setFormdata] = useState({
    phone: '',
    password: '',
  });
  const [token, setToken] = useState('');
const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if( localStorage.getItem('token') ){
    navigate('/');
  return null; // Prevent rendering if already logged in
  }

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/guest/login', formdata);
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name',response.data.name) ;
      localStorage.setItem('guestId', response.data.guestId);
      setToken(response.data.token);
      setMessage(response.data.message);

    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phone">Phone No:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formdata.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {token && <p>Login successful! Token: {token}</p>}
    
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <p>Don't have an account</p><Link to="/Signup">Sign up Now!</Link>
    </div>
  );
};

export default LoginPage;
