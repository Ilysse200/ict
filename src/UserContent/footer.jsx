import React from 'react';
import './userStyles/footer.css';
import {Link} from 'react-router-dom'

{/*Import footer icons */}
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h4>About Us</h4>
                <p>Join our growing team and help shape the future of technology.</p>
            </div>
            <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <Link to='/welcome' className='footer-links'>
                    <li>Welcome</li>
                    </Link>

                    <Link to='/department' className='footer-links'>
                    <li>Departments</li>
                    </Link>

                    <Link to='/apply' className='footer-links'>
                    <li>Applications</li>
                    </Link>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Sectors</h4>
                <ul>
                    <li>Finance sector</li>
                    <li>IT sector</li>
                    <li>Business sector</li>
                    <li>Sales sector</li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Follow Us</h4>
                <div className="social-icons">
                    <li><FaTwitter /></li>
                    <li><FaLinkedin /></li>
                    <li><FaFacebook /></li>
                </div>
            </div>
            <div className="footer-bottom">
                © 2025 JobPortal. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
