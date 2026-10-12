import React, { useState, useEffect } from 'react';

import '../styles/testCard.css'

import heart from "../images/heart.png"

const TestCard = ({
    id="1", 
    text="Алгоритмы в деталях: мастерская Google Blockly", 
    questions="16", 
    time="15"
}) => {



return (
    <div className="testCard">
        <img src={heart} className='testCardImage'/>
        <p className='testCardName'>Тест для <span className='orange medium'>«{text}»</span></p>
        <p className='blockText'>Количество вопросов: <span className='orange'>{questions}</span></p>
        <p className='blockText'>Время выполнения: <span className='orange'>{time}</span></p>
    </div>
 );
};

export default TestCard;