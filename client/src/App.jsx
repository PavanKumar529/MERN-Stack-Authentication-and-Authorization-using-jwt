import React, { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import Navbar from './components/secure-routers/Navbar';
// import Home from './components/secure-routers/Home'
import MyProfile from './components/secure-routers/MyProfile';
import About from './components/secure-routers/About'
import Products  from './components/secure-routers/Products';
import Contact from './components/secure-routers/Contact';
import Settings from './components/secure-routers/Settings'
import Notification from './components/secure-routers/Notification'

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
        <Route path='/myprofile' element={<MyProfile/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/settings' element={<Settings/>} />
        <Route path='/notification' element={<Notification/>} />
          </Routes>      
        </BrowserRouter>

      </store.Provider>

    </div>
  );
}

export default App;
