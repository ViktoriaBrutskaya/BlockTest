import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Countdown from '../components/Countdown';

import arrow from "../images/orange_arrow.png"


import '../styles/test.css'

const Test = () => {

return (
    <div className='blockWrapper'>
       <Header/>
        <div className="backToBlocks">
            <img src={arrow} className='orangeArrow'/>
            <p className='blockText'>Назад к блоку</p>
        </div>

        <div className='time-text'>
            <div className='time'>
                <p className='leftText'>Осталось:</p>
                <Countdown />
            </div>
            
            <div className='testBlock'>

            </div>
        </div>
      
    </div>
 );
};

export default Test;