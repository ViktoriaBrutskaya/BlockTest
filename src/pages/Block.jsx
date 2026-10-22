import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import TestCard from '../components/TestCard';
import { getModules, getModuleTest } from '../api/api'; // Импортируем функции

import line from "../images/line.png"
import desctop from "../images/desctop_img.png"
import arrow from "../images/orange_arrow.png"

import '../styles/block.css'

const Block = () => {
  const { id } = useParams(); 
  
  const [blockTitle, setBlockTitle] = useState('');
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getModules(),      
      getModuleTest(id)   
    ])
      .then(([modulesData, testResult]) => {
        const currentModule = modulesData.find(m => String(m.id) === String(id));
        
        if (currentModule) {
          setBlockTitle(currentModule.title);
        }
        
        setTestData(testResult);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ padding: 20, textAlign: 'center' }}>Загрузка...</div>;
  if (error) return <div style={{ padding: 20, color: 'red', textAlign: 'center' }}>Ошибка: {error}</div>;

  return (
    <div className='blockWrapper'>
       <Header/>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="backToBlocks">
              <img src={arrow} className='orangeArrow' alt="back"/>
              <p className='blockText'>Назад к блокам</p>
          </div>
        </Link>

       <div className='displayBlock'>
        <TestCard 
          id={id}
          text={blockTitle} 
          questions={testData?.question_count || "0"} 
          time={testData?.duration_minutes || "0"} 
        />
        
        <div className='imageAndButton'>
            <img src={desctop} className='decorImage' alt="desctop"/>
            <Link to={`/test/${testData?.id}`} 
            state={{ blockTitle: blockTitle, durationMinutes: testData?.duration_minutes }}
            className='startTest' 
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Начать тест
            </Link>
        </div>
       </div>
        
       <img src={line} className="decor-bottom-right" alt="line" />
    </div>
 );
};

export default Block;