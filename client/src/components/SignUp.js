import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const postData = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    fetch('http://localhost:5000/api/v1/register', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        fullname: fullName,
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          setError(data.message);
          setSuccessMessage('');
        } else {
          // Reset the form
          setFullName('');
          setUserName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');

          // Show success message
          setSuccessMessage('Registration successful! Please login.');

          // Redirect to the login page after a delay
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        setError('An error occurred while registering.');
        setSuccessMessage('');
      });
  };

  return (
    <div className='signup template d-flex justify-content-center align-itmes-center vh-100 text-black'>
      <div className='signup_form_container p-5 rounded'>
        <form>
          <h1>MERNY</h1>
          {/* Render error message if exists */}
          {error && <p className='error-message'>{error}</p>}
          {/* Render success message if exists */}
          {successMessage && <p className='success-message'>{successMessage}</p>}
          <div className='mb-2'>
            <label htmlFor='fullName'>Full Name</label>
            <input
              type='text'
              id='fullName'
              name='fullName'
              className='form-control text-box'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              name='username'
              className='form-control text-box'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email address</label>
            <input
              type='text'
              id='email'
              name='email'
              className='form-control text-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              className='form-control text-box'
              placeholder='show '
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              className='form-control text-box'
              placeholder='show'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className='d-grid'>
            <button type='submit' className='btn btn-primary' onClick={postData}>
              Register
            </button>
          </div>
        </form>
        <p>
          Already have an account? <Link to='/login'>Login Now</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
