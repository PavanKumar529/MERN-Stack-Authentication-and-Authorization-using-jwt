import React, { useState, useContext, useEffect } from 'react';
import { store } from '../../App';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../secure-routers/Navbar';

const MyProfile = () => {
  const [token, setToken] = useContext(store);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.5:5000/myprofile", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => setFormData(res.data))
    .catch(err => console.log(err));
  }, [token]);
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar />
      {
        formData &&
        <center className='text-4xl py-40'>
          <h1>This is My Profile</h1>
          <h1>Welcome to {formData.firstName} {formData.lastName} {formData.surName}</h1>
          <button className='bg-blue-700 text-2xl text-white rounded-md px-2 py-1' onClick={() => setToken(null)}>Logout</button>
        </center>
      }
    </div>
  );
}

export default MyProfile;
