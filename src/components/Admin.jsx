import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styling/Admin.css";

export default function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/check-session', { withCredentials: true })
      .then(response => {
        if (response.data.loggedIn) {
          navigate('/admin/dashboard');
        }
      });
  }, [navigate]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/api/login', { username, password }, { withCredentials: true })
      .then(response => {
        setError('');
        navigate('/admin/dashboard');
      })
      .catch(err => {
        setError('Invalid username or password');
      });
  };

  return (
    <div className="admin">
      <form className="adminform" onSubmit={handleSubmit}>
        <h2 className="adminformh2">Admin Login</h2>
        <div className="adminforminputs">
          <label>Username</label>
          <input 
            id='username' 
            type="text" 
            className="adminfields" 
            placeholder="Enter your Name" 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="adminforminputs">
          <label>Password</label>
          <input 
            id='pass' 
            type="password" 
            className="adminfields" 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your Password" 
            required 
          />
        </div>
        <button className="contactbutton" type="submit">Login</button>
      </form>
    </div>
  );
}
