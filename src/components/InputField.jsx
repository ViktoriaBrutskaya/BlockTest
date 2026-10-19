import React from 'react';
import search from "../images/search.png";
import '../styles/inputField.css';

// Принимаем пропсы из Main
const InputField = ({ value, onChange, onKeyDown, placeholder }) => {
  return (
    <div className="inputField">
        <img src={search} className="search" alt="search"/>
        <input
        type="text"
        className="input"
        value={value}            // Берем значение из Main
        onChange={onChange}      // Передаем событие ввода в Main
        onKeyDown={onKeyDown}    // Передаем нажатие Enter в Main
        placeholder={placeholder || "Введите название..."}
      />
    </div>
  );
};

export default InputField;