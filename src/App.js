// App.js
import React, { useState, useEffect } from 'react';
import Timer from './components/shared/Timer/Timer';
import SmokedButton from './components/shared/SmokeButton/SmokeButton';
import './App.css'; // Import the CSS file

const App = () => {
    const [smokedCount, setSmokedCount] = useState(0);
    const [smokingHistory, setSmokingHistory] = useState([]);
    const [timerStarted, setTimerStarted] = useState(); // Add timerStarted to the state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/smokingHistory');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    setSmokedCount(data.length);
                    setSmokingHistory(data);
                    // Set timerStarted to true if there is at least one entry
                    setTimerStarted( data ? data[data.length-1].date : new Date());
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to fetch data only on mount


    const handleSmoked = () => {
        const newSession = { date: new Date().toLocaleString() };

        // Update smoking history on the server
        fetch('http://localhost:3001/smokingHistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSession),
        })
            .then(response => response.json())
            .then(data => {
                // Update smokedCount when a cigarette is smoked
                setSmokingHistory([...smokingHistory, data]);
                setSmokedCount(prevCount => prevCount + 1);
                // Set timerStarted to true after a cigarette is smoked
                setTimerStarted(data.date);
            })
            .catch(error => console.error('Error adding smoking session:', error));
    };

    const handleReset = () => {
        console.log(smokingHistory)
        smokingHistory.map((smoke) => {
            fetch("http://localhost:3001/smokingHistory/" + smoke.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => console.log('Database cleared:', data))
                .then(() => window.location.reload())
                .catch(error => console.error('Error clearing database:', error));
        })
        // fetch('http://localhost:3001/smokingHistory/', {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        //     .then(response => response.json())
        //     .then(data => console.log('Database cleared:', data))
        //     .catch(error => console.error('Error clearing database:', error));
    };

    return (
        <div className="app-container">
            <h1>Less Cigarette App</h1>
            <Timer onReset={handleReset} timerStarted={timerStarted} />
            <SmokedButton onSmoked={handleSmoked} onReset={handleReset} />
            <div>Smoked Count: {smokedCount}</div>
            <h2>Smoking History</h2>
            <table>
                <thead>
                <tr>
                    <th>Session</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {smokingHistory.map((session, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{session.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;
