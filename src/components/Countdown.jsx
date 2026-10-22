import React, { useState, useEffect, useRef } from 'react';
import '../styles/countdown.css';

const Countdown = ({ minutes: initialMinutes = 15, onFinish }) => {
    
    const totalSeconds = initialMinutes * 60;
    const [timeLeft, setTimeLeft] = useState(totalSeconds);
    const finishedRef = useRef(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (onFinish && !finishedRef.current) {
                finishedRef.current = true;
                onFinish();
            }
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onFinish]);

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const secs = String(timeLeft % 60).padStart(2, '0');

    return (
        <div className="countdown">
            {minutes}:{secs}
        </div>
    );
};

export default Countdown;