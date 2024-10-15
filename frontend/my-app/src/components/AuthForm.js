import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ isSignup }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    hobbies: '',
    email: '',
    password: '',
    role: isSignup ? 'employee' : 'manager',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
    try {
      await axios.post(endpoint, formData);
      alert(`${isSignup ? 'Signup' : 'Login'} successful`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isSignup && (
        <>
          <input name="firstName" placeholder="First Name" onChange={handleChange} required />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
          <input name="gender" placeholder="Gender" onChange={handleChange} required />
          <input name="hobbies" placeholder="Hobbies (comma separated)" onChange={handleChange} required />
        </>
      )}
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
    </form>
  );
};

export default AuthForm;
