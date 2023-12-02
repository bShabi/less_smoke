// Timer.js
import React, { useState, useEffect } from 'react';
import './Timer.css'; // Import the CSS file

const Timer = ({ onReset }) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setSeconds(0); // Reset the timer when onReset changes
    }, [onReset]);

    const formatTime = (timeInSeconds) => {
        const years = Math.floor(timeInSeconds / (365 * 24 * 60 * 60));
        const months = Math.floor((timeInSeconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
        const days = Math.floor((timeInSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
        const hours = Math.floor((timeInSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60);
        const remainingSeconds = timeInSeconds % 60;

        const timeArray = [
            { label: 'years', value: years },
            { label: 'months', value: months },
            { label: 'days', value: days },
            { label: 'hours', value: hours },
            { label: 'minutes', value: minutes },
            { label: 'seconds', value: remainingSeconds },
        ];

        return timeArray
            .filter((unit) => unit.value !== 0)
            .map((unit, index) => (
                <span key={index}>
          {unit.value} {unit.label} {index !== timeArray.length - 1 && ''}
        </span>
            ));
    };

    return (
        <div className="timer-container">
            Timer: {formatTime(seconds)}
        </div>
    );
};

export default Timer;
