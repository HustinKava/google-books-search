import React from "react";
import { Link } from 'react-router-dom';
import "./Navbar.css";
import logo from './Images/giphy.gif';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
<header>
    <nav className="navbar navbar-expand-lg navbar-light" id="navbarMainStyling">
        <div className="container">

            <Link className="navbar-brand" id="brandNameStyling" to='/'>
                <img src={logo} className='logo' alt="logo" />
                <span className='header'>Reactive </span>
                <span className='G'>G</span>
                <span className='o1'>o</span>
                <span className='o2'>o</span>
                <span className='g'>g</span>
                <span className='l'>l</span>
                <span className='e'>e</span> 
                <span className='header'> Book Search</span></Link>

            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarMenu">

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">

                        <Link
                        to='/search'
                        className={window.location.pathname === '/search' ? 'nav-link active' : "nav-link"}>
                        Search
                        </Link>

                    </li>
                    <li className="nav-item">

                        <Link
                        to="/saved"
                        className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"}>
                        Saved
                        </Link>

                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
  );
}
export default Navbar;