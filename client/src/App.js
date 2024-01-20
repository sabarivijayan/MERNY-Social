import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import HomePage from './components/Homepage/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';

import CreatePost from './components/CreatePost';
import DropdownMenu from './components/Dropdown';
import Profile from './components/Profile/Profile';

function App() {
  // Function to handle logout
  return (
    <Router>
    
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/createpost" element={<CreatePost/>} />
          <Route path="/dropdown" element={<DropdownMenu/>} />
         
        </Routes>
      
    </Router>
  );
}

export default App;