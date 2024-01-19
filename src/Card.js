import React from 'react';
import './Card.css';

function Card({ title, subtitle, textOrientation, emoji }) {
    const contentClass = textOrientation === 'landscape' ? 'content-landscape' : '';
    const emojiStyle = {
        fontSize: '3em',
        margin: '10px 0' // Adjust margins as needed for spacing
    };

    return (
        <div className={`card ${textOrientation}`}>
            <div className={`card-content ${contentClass}`}>
                <h3>{title}</h3>
                <p>{subtitle}</p>
                {emoji && <span style={emojiStyle}>{emoji}</span>}
            </div>
        </div>
    );
}

export default Card;
