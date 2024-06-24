import React from 'react';
import { Link } from 'react-router-dom';
import '../Autcss.css'
const Nav = () => {
  return (
    <nav>
      <ul className="navbar">
        <li><Link to='/app/welcomeHome'>Home</Link></li>
        <li><Link to='/app/Donors_Details'>Donors_Details</Link></li>
        <li><Link to='/app/ContactUs'>Contact Us</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;