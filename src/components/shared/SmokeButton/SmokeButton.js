// SmokedButton.js
import React from 'react';

const SmokedButton = ({ onSmoked, onReset }) => {
    return (
        <div>
            <button onClick={() => { onSmoked(); onReset(); }}>Smoked a cigarette</button>
        </div>
    );
};

export default SmokedButton;