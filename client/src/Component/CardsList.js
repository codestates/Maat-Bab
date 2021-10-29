import React from 'react';
import Card from './Card';
import './CardsList.css';

function CardsList({ cardData }) {
    return (
        <div className='cardslist'>
            {cardData?.map(card => {
                return (
                    <Card className='card__section' region={card.region} date={card.date} time={card.time} headCount={card.headcount} restaurant={card.restaurant_name} title={card.chat_title}
                    />
                )
            })}
        
        </div>
    )
}

export default CardsList
