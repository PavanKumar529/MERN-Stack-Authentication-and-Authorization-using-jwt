import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    surName: '',
    gender: '', // Change gender to an empty string initially
    email: '',
    password: '',
    confirmPassword: '',
    photo: null // Add a state for storing the file
  });

  const changeHandler = (e) => {
// If the input is a file, update the photo state
    if(e.target.name === "photo") {
      const file = e.target.files[0]
      setFormData({ 
        ...formData,
        photo: file,
        fileType: file.type // Add the file type to the state
      });
    }
    else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };



  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Form Data", formData);
    try {
      const response = await axios.post("http://127.0.0.5:5000/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response.data); // Log response from the server
      alert("Data Stored in Database");
    } catch (error) {
      console.error("Error:", error);
    }
  };
    
  // // Send POST request
  //   axios.post("http://127.0.0.5:5000/register", formData, {   
  //     headers: {
  //       "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
  //   },
  // })
  //     // .then(res => alert(res.formData) )
  //     .then(res => alert("Data Stored in Database"))
  //     .catch(err => console.log("error:", err))
  // };

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


        <label className='mr-4'>Gender: </label>
        <input
          type="radio"
          name="gender"
          id='male'
          value="male"
          checked={formData.gender === "male"}
          onChange={changeHandler}
          className='mr-2'
        />
        <label htmlFor="male" className="mr-4">Male</label> {/* Add margin-right utility class for spacing */}


        <input
          type="radio"
          name="gender"
          id='female'
          value="female"
          checked={formData.gender === "female"}
          onChange={changeHandler}
          className='mr-2'
        />
        <label htmlFor="female" className='mr-4'>Female</label>

        
        <input
          type="radio"
          name="gender"
          id='others'
          value="others"
          checked={formData.gender === "others"}
          onChange={changeHandler}
          className='mr-2'
        />
        <label htmlFor="others">Others</label>


        {/* <input
          type="dropdown"
          name="surName"
          value={formData.surName}
          onChange={changeHandler}
          placeholder="Surname"
          className="w-full mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        /> */}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Email"
          className="w-full mt-4 mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
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


        <input
          type="file"
          name="photo"
          value={formData.file}
          onChange={changeHandler }
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
