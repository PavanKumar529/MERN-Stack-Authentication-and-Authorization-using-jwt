import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import { store } from '../../App';

function Login() {
  const [token, setToken] = useContext(store)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.5:5000/login", formData)
      .then(res => setToken(res.data.token))
        .catch(err => console.log(err))
  };
  if(token) {
    return <Navigate to="/myprofile" />
  }

  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h3 className="text-3xl font-semibold text-center mb-6">Login</h3>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Email"
          className="w-full mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={changeHandler}
          placeholder="Password"
          className="w-full mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <span>Don't have an account? </span>
        <Link to="/register" className="text-blue-500 hover:text-blue-600">Register</Link>
      </div>
    </div>
  );
}

export default Login;
