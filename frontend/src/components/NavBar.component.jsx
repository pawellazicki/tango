import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

function NavBar(props) {

    return (
        <ul className="topnav">
            {/* <li className="right"><Link to={'/'} className="nav-link">Boards</Link></li> */}
            <li className="right"><Link to={'/login'} className="nav-link">Login</Link></li>
            <li className="right"><Link to={'/register'} className="nav-link">Register</Link></li>
        </ul>
    );
}

export default NavBar;