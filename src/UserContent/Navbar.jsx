import React from 'react';
import { Link } from 'react-router-dom';
import './userStyles/navbar.css';

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="navbar-logo">
                <i className="fas fa-briefcase"></i>
                <span>JobPortal</span>
            </div>
            <nav className="navbar-links">
                <Link to="/welcome">Welcome</Link>
                <Link to="/department">Available vacancies</Link>
                <Link to="/apply">Apply</Link>
            </nav>
        </header>
    );
};

export default Navbar;
