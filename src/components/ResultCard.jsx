import React from 'react';
import '../styles/resultCard.css';

import right from "../images/star.png";
import wrong from "../images/empty_star.png";

const ResultCard = ({
    id = "1", 
    text = "Алгоритмы в деталях: мастерская Google Blockly", 
    questions = "16", 
    result = "10"
}) => {
    
    const totalQuestions = Number(questions);
    const correctAnswers = Number(result);
    const wrongAnswers = totalQuestions - correctAnswers;

    return (
        <div className="resultCard">
            <p className='testCardNameRes'>
                Тест для <span className='orange medium'>«{text}»</span>
            </p>
            <p className='blockText'>
                Количество вопросов: <span className='orange'>{questions}</span>
            </p>
            
            
            <div className="resultRow">
                <p className='blockText' style={{ margin: 0 }}>Ваш результат:</p>
                
                <div className="starsContainer">
                    {Array.from({ length: correctAnswers }).map((_, index) => (
                        <img key={`right-${index}`} src={right} className='star' alt="Correct" />
                    ))}
                    
                    {Array.from({ length: wrongAnswers }).map((_, index) => (
                        <img key={`wrong-${index}`} src={wrong} className='star' alt="Wrong" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResultCard;