import React, { useState, useEffect } from 'react';

import '../styles/blockCard.css'

import lamp from "../images/lamp.png"

const BlockCard = ({
    id="1", 
    text="Алгоритмы в деталях: мастерская Google Blockly", 
    color="var(--color-pink)", 
    image="lamp"
}) => {

const cardStyle={
    backgroundColor: color,
}

return (
    <div className="blockCard" style={cardStyle}>
        <img src={lamp} className='blockCardImage'/>
        <p className='blockCardName'>{text}</p>
        <button className="openBlockButton">Открыть тест</button>
    </div>
 );
};

export default BlockCard;