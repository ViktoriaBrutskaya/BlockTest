import React, { useState, useEffect } from 'react';

import wave from "../images/blue_wave.png"
import logo from "../images/logo.png"

import '../styles/Header.css'

const Header = () => {

    
return (
    <div className="header">
        <img src={logo} className="logo" alt="logo"/>
        <img src={wave} className="decor-top-right" alt="wave" />
    </div>
 );
};

export default Header;