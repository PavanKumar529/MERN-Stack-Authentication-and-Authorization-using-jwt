import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../App';

const Nav = () => {
  const [token, setToken] = useContext(store)
  return (
    <>
      {
        !token &&

        <nav className='bg-gray-600 p-4'>
        <div className='container mx-auto flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-white'>My Website</h1>
          <ul className='flex space-x-4 text-lg text-white'>
            {/* <li><Link to="/register" className='bg-blue-700 p-2 hover:text-blue-700 hover:bg-white'>Register</Link></li> */}
            <li><Link to="/register" className='bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-white hover:text-blue-900'>Register</Link></li>
            <li><Link to="/login" className='bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-white hover:text-blue-900'>Login</Link></li>
            {/* <li><button className='bg-blue-700 p-2'><Link to="/login" className='hover:text-gray-300'>Login</Link></button></li> */}
          </ul>
        </div>
      </nav>
      }
    </>
  );
};

export default Nav;
