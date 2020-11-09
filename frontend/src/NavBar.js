import React, { Component } from 'react';
import App from './App';
import './App.css';

function NavBar(){
    return (
        <ul className="topnav">
            <li className="right"><a href="#register">register</a></li>
            <li className="right"><a href="#login">Log in</a></li>
        </ul>
    );
}

export default NavBar;