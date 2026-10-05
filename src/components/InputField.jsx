import React, { useState, useEffect } from 'react';

import search from "../images/search.png"

import '../styles/inputField.css'

const InputField = () => {

const [value, setValue] = useState('');
    
return (
    <div className="inputField">
        <img src={search} className="search" alt="search"/>
        <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Введите название..."
      />
    </div>
 );
};

export default InputField;