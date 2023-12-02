    // App.js
    import React, { useState,useEffect } from 'react';
    import Timer from './components/shared/Timer/Timer';
    import SmokedButton from './components/shared/SmokeButton/SmokeButton';
    import './App.css'; // Import the CSS file
    const App = () => {
        const [smokedCount, setSmokedCount] = useState(0);
        const [smokingHistory, setSmokingHistory] = useState([]);



        useEffect(() => {
            fetch('http://localhost:3001/smokingHistory')
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setSmokedCount(data.lengthgit remote add origin https://github.com/bShabi/less_smoke.git)
                        setSmokingHistory(data);
                    } else {
                        console.error('Invalid data format:', data);
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        }, []);
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
                })
                .catch(error => console.error('Error adding smoking session:', error));
        };


        const handleReset = () => {
            // Reset the timer without clearing the smoking history
        };


        return (
            <div className="app-container">
                <h1>Less Cigarette App</h1>
                <Timer onReset={handleReset} />
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