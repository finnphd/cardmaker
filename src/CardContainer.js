import React, { useState } from 'react';
import Card from './Card';
import CardForm from './CardForm';
import './CardContainer.css';
function CardContainer() {
    const [cards, setCards] = useState([]);

    const addCard = (newTitle, newSubtitle, newTextOrientation, newEmoji) => {
        setCards([...cards, { 
            title: newTitle, 
            subtitle: newSubtitle, 
            textOrientation: newTextOrientation,
            emoji: newEmoji  // Add this line
        }]);
    };
   return (
    <div>
        <CardForm addCard={addCard} />
        <div className="card-container">
            {cards.map((card, index) => (
                <div className="card-wrapper" key={index}>
                    <Card 
                        title={card.title} 
                        subtitle={card.subtitle} 
                        textOrientation={card.textOrientation} 
                        emoji={card.emoji}
                    />
                </div>
            ))}
        </div>
    </div>
);
}


export default CardContainer;
