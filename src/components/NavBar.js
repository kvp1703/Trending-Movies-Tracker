import React from 'react';
import logo from '../resources/logo.png';
import { Link } from 'react-router-dom';

function NavBar() {
  return <>
    <div className="border pl-12 flex space-x-8 items-center py-4">

      <img src={logo} className="object-contain 
       w-[50px] md:w-[80px] " ></img>

      <Link to="/" className="text-blue-400
       font-bold text-xl md:text-3xl">Movies</Link>

      <Link to="/favourites" className="text-blue-400 font-bold
       text-xl md:text-3xl">Favourites</Link>

    </div>
  </>
}

export default NavBar;
