import React, { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import Navbar from './components/secure-routers/Navbar';
// import Home from './components/secure-routers/Home'
import MyProfile from './components/secure-routers/MyProfile';
// import About from './components/About'
// import Product  from './components/Product';
// import Contact from './components/Contact';
import Nav from './components/unsecure-routers/Nav'
import Login from './components/unsecure-routers/Login';
import Register from './components/unsecure-routers/Register';
// import Settings from './components/Settings';
// import SignOut from './components/SignOut';

export const store = createContext();

function App() {
  const [token, setToken] = useState(null)
  return (
    <div>
      <store.Provider value={[token, setToken]}>
          
        <BrowserRouter>
        <Nav />
        {/* <Navbar /> */}
        <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
          {/* <Route path='/' element={<Home/>} /> */}
          {/* <Route path='/about' element={<About/>} />
          <Route path='/product' element={<Product/>} />
          <Route path='/contact' element={<Contact/>} /> */}
        <Route path='/myprofile' element={<MyProfile/>} />
          {/* <Route path='/settings' element={<Settings/>} />
          <Route path='/signout' element={<SignOut/>} /> */}

          </Routes>      
        </BrowserRouter>

      </store.Provider>

    </div>
  );
}

export default App;
