import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { logUserOut } from "../action/userActions"

function NavBar({isAuthenticated}) {

    let history = useHistory();
    const dispatch = useDispatch()

    const logOut = () => {
        history.push("/login")
        dispatch(logUserOut());
    }

    return (
        <ul className="topnav">
            { !isAuthenticated && <li className="right"><Link to={'/login'} className="nav-link">Login</Link></li> }
            { !isAuthenticated && <li className="right"><Link to={'/register'} className="nav-link">Register</Link></li> }
            { isAuthenticated && <li className="right"><Link to={'/login'} onClick={logOut} className="nav-link">Log out</Link></li> }
            { isAuthenticated && <li className="right"><Link to={'/'} className="nav-link">Boards</Link></li> }
            
        </ul>
    );
}

export default NavBar;