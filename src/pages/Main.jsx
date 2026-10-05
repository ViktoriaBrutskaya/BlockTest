import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import InputField from '../components/InputField';
import BlockCard from '../components/BlockCard';


import '../styles/main.css'

const Main = () => {

return (
    <>
       <Header/>
       <div className='searchBlock'>
        <InputField/>
        <button className="searchButton">Найти</button>
       </div>
       <div className= 'blocksList'>
         <BlockCard/>
         <BlockCard/>
         <BlockCard/>
         <BlockCard/>
         <BlockCard/>
         <BlockCard/>
       </div>
       
       
    </>
 );
};

export default Main;