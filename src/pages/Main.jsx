import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import InputField from '../components/InputField';
import BlockCard from '../components/BlockCard';
import { getModules } from '../api/api';

import '../styles/main.css';

const Main = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Стейт для того, что вводится в инпут
  const [searchQuery, setSearchQuery] = useState('');
  // 2. Стейт для того, что применилось по кнопке
  const [appliedQuery, setAppliedQuery] = useState('');

  useEffect(() => {
    getModules()
      .then((data) => {
        setModules(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Обработчик клика по кнопке
  const handleSearch = () => {
    setAppliedQuery(searchQuery);
  };

  // Обработчик нажатия Enter в инпуте
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Фильтрация модулей
  const filteredModules = modules.filter((module) => {
    if (!appliedQuery) return true; // Если поиск пустой — показываем всё
    
    // Приводим к нижнему регистру и ищем вхождение подстроки
    return module.title.toLowerCase().includes(appliedQuery.toLowerCase().trim());
  });

  return (
    <>
      <Header />
      <div className="searchBlock">
        <InputField 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="searchButton" onClick={handleSearch}>
          Найти
        </button>
      </div>
      
      <div className="blocksList">
        {loading && <p style={{ width: '100%', textAlign: 'center' }}>Загрузка блоков...</p>}
        {error && <p style={{ color: 'red', width: '100%', textAlign: 'center' }}>Ошибка: {error}</p>}
        
        {/* Используем отфильтрованный массив */}
        {!loading && !error && filteredModules.map((module) => (
          <BlockCard 
            key={module.id}
            id={module.id}
            text={module.title}
            color={module.category?.bg_color || 'var(--color-pink)'}  
            imageUrl={module.category?.image || null}
          />
        ))}

        {/* Если после фильтрации ничего не осталось */}
        {!loading && !error && modules.length > 0 && filteredModules.length === 0 && (
          <p style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
            По запросу «{appliedQuery}» ничего не найдено.
          </p>
        )}

        {!loading && !error && modules.length === 0 && (
          <p style={{ width: '100%', textAlign: 'center' }}>В базе пока нет тестов</p>
        )}
      </div>
    </>
  );
};

export default Main;