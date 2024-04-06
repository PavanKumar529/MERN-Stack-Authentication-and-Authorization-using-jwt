import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    surName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.5:5000/register", formData)
      .then(res => alert(res.formData) )
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h3 className="text-3xl font-semibold text-center mb-6">Register</h3>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={changeHandler}
          placeholder="First Name"
          className="w-full mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={changeHandler}
          placeholder="Last Name"
          className="w-full mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="surName"
          value={formData.surName}
          onChange={changeHandler}
          placeholder="Surname"
          className="w-full mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
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
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={changeHandler }
          placeholder="Confirm Password"
          className="w-full mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-center">
        <span>Already have an account? </span>
        <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link>
      </div>
    </div>
  );
}

export default Register;
