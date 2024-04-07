import React, { useState, useContext, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PavanImg from '../../assets/Pavan.png';
import EcommLogo from '../../assets/ecommerce-logo.png';
import { IoSearch } from "react-icons/io5";
import axios from 'axios';

import { store } from '../../App';



function Navbar() {
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Define isSearchOpen state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen); // Toggle isSearchOpen state
  };

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Perform search operation (e.g., fetch search results from API)
    // For demonstration purposes, we'll just filter a static list of items
    const results = YourSearchFunction(query); // Implement your search logic here
    setSearchResults(results);
  };

  // Function to simulate search results
  const YourSearchFunction = (query) => {
    // Implement your search logic here (e.g., fetch search results from an API)
    // For demonstration purposes, we'll just filter a static list of items
    const items = ['iPhone', 'Samsung Galaxy', 'Laptop', 'Headphones', 'Camera'];
    return items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Mobile menu closed icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {/* Mobile menu open icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          {/* Logo and navigation links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Your company logo */}
            <div className="flex flex-shrink-0 items-center">
              <Link to ='/myprofile' >
                <img className="h-8 w-auto" src={EcommLogo} alt="Company-logo" />
              </Link>
            </div>
            {/* Desktop navigation links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to='/myprofile' className="text-white hover:bg-gray-600 rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</Link>
                <Link to='/about' className="text-white hover:bg-gray-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium">About</Link>
                <Link to='/products' className="text-white hover:bg-gray-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Product</Link>
                <Link to='/contact' className="text-white hover:bg-gray-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Contact</Link>
              </div>
            </div>
          </div>



          {/* Search bar */}
          <div className="relative sm:ml-3 sm:flex">
            <button
              onClick={toggleSearch}
              className="absolute right-0 top-0 mt-2 mr-4 focus:outline-none">
                <IoSearch className='text-white text-xl'/>

              {/* <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg> */}
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className=
              {`${
                // isSearchOpen ? 'w-48' : 'w-0'
                isSearchOpen ? 'w-48' : 'w-48'
              } bg-gray-700 rounded-full text-white px-4 py-1 focus:outline-none transition-width duration-500 ease-in-out`}
              placeholder="Search"
            />


  {/* Search bar
          <div className="relative sm:ml-3 sm:flex">
            <button
              onClick={toggleSearch}
              className="absolute right-0 top-0 mt-2 mr-4 focus:outline-none">
                <IoSearch className='text-white text-xl'/>
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className={`${
                // isSearchOpen ? 'w-48' : 'w-0'
                isSearchOpen ? 'w-48' : 'w-48'

              } bg-gray-700 rounded-full text-white px-4 py-1 focus:outline-none transition-width duration-500 ease-in-out`}
              placeholder="Search"
            /> */}



            {isSearchOpen && (
              <div className="absolute z-10 top-12 bg-white w-full rounded-md shadow-md mt-1">
                <ul>
                  {searchResults.map((result, index) => (
                    <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Notification button and profile dropdown */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Notification button */}
            <Link to="/notification"
              // type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </Link>
            {/* Profile dropdown */}
            <div className="relative ml-3">
              <button
                type="button"
                onClick={toggleProfileMenu}
                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-expanded={isProfileMenuOpen}
                aria-haspopup="true"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-10 w-10 border-2 rounded-full"
                  src={PavanImg}
                  alt="Profile"
                />
              </button>
              {/* Profile dropdown menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" tabIndex="-1">
                  <Link to='/myprofile' className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1">My Profile</Link>
                  <Link to='/settings' className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1">Settings</Link>
                  <button onClick={() => setToken(null)} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1">Sign out</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* Mobile menu links */}
            <Link to='/myprofile' className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Home</Link>
            <Link to='/about' className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">About</Link>
            <Link to='/products' className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Product</Link>
            <Link to='/contact' className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
