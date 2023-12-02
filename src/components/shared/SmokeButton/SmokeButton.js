// SmokedButton.js
import React from 'react';

const SmokedButton = ({ onSmoked, onReset }) => {
    return (
        <div>
            <button onClick={() => { onSmoked(); }}>Smoked a cigarette</button>
            <button onClick={() => { onReset(); }}>Rest a cigarette</button>

        </div>
    );
};

export default SmokedButton;