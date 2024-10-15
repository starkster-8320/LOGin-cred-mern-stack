import React from 'react';
import AuthForm from '../components/AuthForm';

const Signup = () => {
  return (
    <div>
      <h2>Signup</h2>
      <AuthForm isSignup={true} />
    </div>
  );
};

export default Signup;
