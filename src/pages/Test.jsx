import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Countdown from '../components/Countdown';
import ResultCard from '../components/ResultCard';
import Modal from '../components/ModalResult';
import { getTestQuestions, checkAnswer } from '../api/api';

import arrow from "../images/orange_arrow.png";
import desctop from "../images/desctop_note.png";
import tablet from "../images/tablet_note.png";
import phone from "../images/phone_note.png";

import '../styles/test.css';

const Test = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({}); 
    
    const [isFinished, setIsFinished] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isFinishing, setIsFinishing] = useState(false);
    const [error, setError] = useState(null);

    const blockTitle = location.state?.blockTitle || 'Прохождение теста';

    useEffect(() => {
        getTestQuestions(testId)
            .then(data => {
                const sortedQuestions = data.sort((a, b) => a.position - b.position);
                setQuestions(sortedQuestions);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Не удалось загрузить вопросы теста.');
                setLoading(false);
            });
    }, [testId]);

    const handleOptionClick = async (question, optionId) => {
        if (isFinished) return; 


        const isMultiple = question.type === 'multiple' || question.type === 'multiply';

        setAnswers(prev => {
            const current = prev[question.id] || [];

            if (isMultiple) {

                return {
                    ...prev,
                    [question.id]: current.includes(optionId)
                        ? current.filter(id => id !== optionId)
                        : [...current, optionId]
                };
            } else {
                return { ...prev, [question.id]: [optionId] };
            }
        });


        try {
            const res = await checkAnswer({
                testId: Number(testId),
                questionId: question.id,
                optionId: optionId
            });
            
            if (res.is_correct) {
                setAnswers(prev => ({
                    ...prev,
                    [`correct_${question.id}_${optionId}`]: true
                }));
            }
        } catch (err) {
            console.error('Ошибка проверки ответа:', err);
        }
    };

    const getOptionState = (question, optionId, isChecked) => {
        if (!isFinished) return '';

        if (isChecked) {
            if (answers[`result_${question.id}`] === true) return 'correct';
            if (answers[`result_${question.id}`] === false) return 'wrong';
        }

        if (!isChecked && answers[`correct_${question.id}_${optionId}`]) {
            return 'missed';
        }

        return '';
    };

    const finish = async () => {
        setIsFinishing(true);

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        
        const newAnswers = { ...answers };


        const optionsToCheck = [];
        questions.forEach(q => {
            q.options.forEach(opt => {
                const isChecked = (answers[q.id] || []).includes(opt.id);
                if (!isChecked) {
                    optionsToCheck.push({ qId: q.id, optId: opt.id });
                }
            });
        });

        for (let i = 0; i < optionsToCheck.length; i++) {
            const { qId, optId } = optionsToCheck[i];
            try {
                const res = await checkAnswer({
                    testId: Number(testId),
                    questionId: qId,
                    optionId: optId
                });
                
                if (res.is_correct) {
                    newAnswers[`correct_${qId}_${optId}`] = true;
                }
            } catch (err) {
                if (err.status === 429) {
                    await delay(100);
                    try {
                        const retryRes = await checkAnswer({
                            testId: Number(testId),
                            questionId: qId,
                            optionId: optId
                        });
                        if (retryRes.is_correct) {
                            newAnswers[`correct_${qId}_${optId}`] = true;
                        }
                    } catch (retryErr) {
                        console.error('Повторная ошибка:', retryErr);
                    }
                }
            }
            await delay(50);
        }

        questions.forEach(q => {
            const userAns = answers[q.id] || [];
            
            let correctForQuestion = [];
            q.options.forEach(opt => {
                if (newAnswers[`correct_${q.id}_${opt.id}`]) {
                    correctForQuestion.push(opt.id);
                }
            });

            const isRight = userAns.length > 0 && 
                            userAns.length === correctForQuestion.length && 
                            userAns.every(id => correctForQuestion.includes(id));
            
            newAnswers[`result_${q.id}`] = isRight;
        });

        setAnswers(newAnswers);
        setIsFinished(true);
        setIsFinishing(false);

        if (window.innerWidth <= 1200) {
            setIsModalOpen(true);
        }
    };

    const countCorrect = () => {
        let count = 0;
        questions.forEach(q => {
            if (answers[`result_${q.id}`] === true) count++;
        });
        return count;
    };

    const correctCount = countCorrect();
    const totalCount = questions.length;

    if (loading) return <div style={{ padding: 20, textAlign: 'center' }}>Загрузка вопросов...</div>;
    if (error) return <div style={{ padding: 20, color: 'red', textAlign: 'center' }}>{error}</div>;

    return (
        <div className='blockWrapper'>
            <Header />

            <div className="backToBlocks" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                <img src={arrow} className='orangeArrow' alt="back" />
                <p className='blockText'>Назад к блоку</p>
            </div>

            <div className={`time-text ${isFinished ? 'finished' : ''}`}>
                {!isFinished && (
                    <div className='time'>
                        <p className='leftText'>Осталось:</p>
                        <Countdown />
                    </div>
                )}

                {isFinished && (
                    <div className='desktopResult'>
                        <ResultCard
                            text={blockTitle}
                            questions={String(totalCount)}
                            result={String(correctCount)}
                        />
                    </div>
                )}

                <div className={`testBlock ${isFinished ? 'fullWidth' : ''}`}>
                    <img src={desctop} className='bgDesctop bgImg' alt="" />
                    <img src={tablet} className='bgTablet bgImg' alt="" />
                    <img src={phone} className='bgPhone bgImg' alt="" />

                    <div className='test-content'>
                        <p className='testName'>{blockTitle}</p>

                        {questions.map((q, idx) => {
                            const selected = answers[q.id] || [];
                            // Определяем тип для отрисовки инпута
                            const isMultiple = q.type === 'multiple' || q.type === 'multiply';
                            
                            return (
                                <div key={q.id} className='question-box'>
                                    <p className='question'>
                                        {idx + 1}. {q.text}
                                    </p>

                                    <div className='options'>
                                        {q.options.map(opt => {
                                            const isChecked = selected.includes(opt.id);
                                            const stateClass = getOptionState(q, opt.id, isChecked);

                                            return (
                                                <label
                                                    key={opt.id}
                                                    className={`round-check ${stateClass}`}
                                                >
                                                    <input
                                                        // Динамически ставим radio или checkbox
                                                        type={isMultiple ? "checkbox" : "radio"}
                                                        name={`question-${q.id}`}
                                                        checked={isChecked}
                                                        disabled={isFinished || isFinishing}
                                                        onChange={() => handleOptionClick(q, opt.id)}
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

                        <button
                            className='finish-btn'
                            onClick={finish}
                            disabled={isFinished || isFinishing}
                        >
                            {isFinishing ? 'Проверка...' : 'Завершить'}
                        </button>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ResultCard
                    text={blockTitle}
                    questions={String(totalCount)}
                    result={String(correctCount)}
                />
            </Modal>
        </div>
    );
};

export default Test;