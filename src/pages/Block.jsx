import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import TestCard from '../components/TestCard';

import line from "../images/line.png"

import desctop from "../images/desctop_img.png"


import arrow from "../images/orange_arrow.png"


import '../styles/block.css'

const Block = () => {

return (
    <div className='blockWrapper'>
       <Header/>
        <div className="backToBlocks">
            <img src={arrow} className='orangeArrow'/>
            <p className='blockText'>Назад к блокам</p>
        </div>
       <div className='displayBlock'>
        <TestCard/>
        <div className='imageAndButton'>
            <img src={desctop} className='decorImage'/>

            <button className='startTest'>Начать тест</button>
        </div>
       </div>
        
       <img src={line} className="decor-bottom-right" alt="line" />
    </div>
 );
};

export default Block;