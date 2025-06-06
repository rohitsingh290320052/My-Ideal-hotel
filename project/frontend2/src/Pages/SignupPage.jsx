import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [formdata, setFormdata] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/guest/register', formdata);
      console.log(res.data);
      // Optionally redirect or show success message here
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
        <h1>Signup Page</h1>
      <form onSubmit={handlesubmit}>
        <label htmlFor="name">Username</label>
        <input type="text" id="name" name="name" required onChange={handlechange} />

        <label htmlFor="phone">Phone No:</label>
        <input type="text" id="phone" name="phone" required onChange={handlechange} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required onChange={handlechange} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required onChange={handlechange} />

        <button type="submit">Signup</button>
      </form>
      <p>Already have account</p><Link to="/login">Login Now</Link>
    </div>
  );
};

export default SignupPage;