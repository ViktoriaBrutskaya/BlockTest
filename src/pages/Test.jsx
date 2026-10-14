import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Countdown from '../components/Countdown';

import arrow from "../images/orange_arrow.png";
import desctop from "../images/desctop_note.png";
import tablet from "../images/tablet_note.png";
import phone from "../images/phone_note.png";

import '../styles/test.css';

const Test = () => {
    const [questions, setQuestions] = useState([]);
    // answers: { [questionId]: number[] }
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        // fetch('/api/test/1/questions')...
        setQuestions([
            { id: 1, text: "Что такое цикл?", type: "multiply",
              options: [
                { id: 11, text: "ответ" },
                { id: 12, text: "ответ" },
                { id: 13, text: "ответ" },
              ]},
            { id: 2, text: "Что такое цикл?", type: "single",
              options: [
                { id: 21, text: "ответ" },
                { id: 22, text: "ответ" },
                { id: 23, text: "ответ" },
              ]},
             { id: 3, text: "Что такое цикл?", type: "single",
              options: [
                { id: 21, text: "ответ" },
                { id: 22, text: "ответ" },
                { id: 23, text: "ответ" },
              ]},
               { id: 4, text: "Что такое цикл?", type: "single",
              options: [
                { id: 21, text: "ответ" },
                { id: 22, text: "ответ" },
                { id: 23, text: "ответ" },
              ]},
               { id: 5, text: "Что такое цикл?", type: "single",
              options: [
                { id: 21, text: "ответ" },
                { id: 22, text: "ответ" },
                { id: 23, text: "ответ" },
              ]},
               { id: 6, text: "Что такое цикл?", type: "single",
              options: [
                { id: 21, text: "ответ" },
                { id: 22, text: "ответ" },
                { id: 23, text: "ответ" },
              ]},
        ]);
    }, []);

    const toggleAnswer = (question, optionId) => {
        setAnswers(prev => {
            const current = prev[question.id] || [];
            if (question.type === 'single') {
                return { ...prev, [question.id]: [optionId] };
            }
            return {
                ...prev,
                [question.id]: current.includes(optionId)
                    ? current.filter(id => id !== optionId)
                    : [...current, optionId],
            };
        });
    };

    const finish = () => {
        const payload = Object.entries(answers).map(([qId, opts]) => ({
            question_id: Number(qId),
            option_ids: opts,
        }));
        console.log('Отправка:', payload);
        // fetch('/api/test/1/submit', { method: 'POST', ... })
    };

    return (
        <div className='blockWrapper'>
            <Header />

            <div className="backToBlocks">
                <img src={arrow} className='orangeArrow' />
                <p className='blockText'>Назад к блоку</p>
            </div>

            <div className='time-text'>
                <div className='time'>
                    <p className='leftText'>Осталось:</p>
                    <Countdown />
                </div>

                <div className='testBlock'>
                    <img src={desctop} className='bgDesctop bgImg' />
                    <img src={tablet} className='bgTablet  bgImg' />
                    <img src={phone} className='bgPhone   bgImg' />
                   
                    <div className='test-content'>
                         <p className='testName'>Алгоритмы в деталях: мастерская Google Blockly</p>
                        {questions.map((q, idx) => {
                            const selected = answers[q.id] || [];
                            const inputType = q.type === 'single' ? 'radio' : 'checkbox';

                            return (
                                <div key={q.id} className='question-box'>
                                    <p className='question'>
                                        {idx + 1}. {q.text}
                                    </p>

                                    <div className='options'>
                                        {q.options.map(opt => {
                                            const isChecked = selected.includes(opt.id);
                                            return (
                                                <label key={opt.id} className="round-check">
                                                    <input
                                                        type={inputType}
                                                        name={`question-${q.id}`}
                                                        checked={isChecked}
                                                        onChange={() => toggleAnswer(q, opt.id)}
                                                    />
                                                    <span className="round-check__mark"></span>
                                                    <span className="round-check__label">{opt.text}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}

                        <button className='finish-btn' onClick={finish}>
                            Завершить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Test;