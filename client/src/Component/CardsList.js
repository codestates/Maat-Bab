import React from 'react';
import Card from './Card';
import './CardsList.css';

function CardsList({ cardData, cardClickinMainHandler}) {
    console.log('cardData: ', cardData)
    return (
        <div className='cardslist'>
            {cardData ? (
                cardData.map(card => {
                    return (
                        <Card className='card__section' region={card.region} date={card.date.slice(0, 10)} time={card.time} headCount={card.headcount} restaurant={card.restaurant_name} title={card.chat_title}
                        cardClickinMainHandler={cardClickinMainHandler}
                        />
                    )
                })) : (
                    <div className='loader__box__ifnull'> 맞밥 약속을 조회해 보세요!</div>
                ) 
            }
        </div>
    )
}

export default CardsList
