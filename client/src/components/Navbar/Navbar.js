import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import './Navbar.css'

const Navbar = ({ location }) => {


    return (    
        <div className="topnav">
            <a  href="/">Home</a>
        </div>
    );

  }
  
  export default Navbar;