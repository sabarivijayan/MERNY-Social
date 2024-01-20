import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../style.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const postData = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/v1/login', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log('logindone', data);
      if (data) {
        Cookies.set('jwt', data.token, { expires: 30 });
        navigate('/homepage');
        // window.location.href = '/homepage'; 
        // console.log(data.success)
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 text-black'>
      <div className='form_container p-5 rounded'>
        <form>
          <h1>MERNY</h1>
          <div className='mb-2'>
            <label htmlFor='email'>Email address</label>
            <input
              type='email'
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='d-grid'>
            <button type='submit' className='btn btn-secondary' onClick={postData}>
              Login
            </button>
          </div>
          <p className='text-end mt-2'>
            Don't have an account? <Link to='/register'>Register Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
