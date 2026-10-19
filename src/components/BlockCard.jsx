import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/blockCard.css';


import defaultLamp from "../images/lamp.png";

const BlockCard = ({
    id, 
    text, 
    color = "var(--color-pink)", 
    imageUrl
}) => {

  const cardStyle = {
    backgroundColor: color,
  };

  const imgSrc = imageUrl ? imageUrl : defaultLamp; 

  return (
    <div className="blockCard" style={cardStyle}>
      <img src={imgSrc} className='blockCardImage' alt={text} />
      <p className='blockCardName'>{text}</p>
      
      <Link to={`/block/${id}`} className="openBlockButton" style={{ textDecoration: 'none' }}>
        Открыть тест
      </Link>
    </div>
  );
};

export default BlockCard;