import React from 'react';
import Card from './Card';
import './CardsList.css';

function CardsList({ cardData, selectedCard, cardClickinMainHandler, cardClickinChatHandler, deleteCardModalHandler }) {
    const isMyCard = cardData?.find(card => card.Card);

    let cardList = [];
    if (isMyCard) {
        cardList = cardData.map(data => {
            if (data.Card) {
                return {
                    ...data.Card, ...data
                }
            }
        }).filter(Boolean)
    } else {
        cardList = cardData;
    }

    let nullText = '';
    if (!cardList) {
        nullText= '맞밥 약속을 조회해 보세요'
    } 
    else if (cardList && !cardList.length) {
        nullText = '맞밥 약속을 추가해 보세요'
    }

    return (
        <div className='cardslist__background'>
            {cardList && cardList.length ? cardList?.map((card,idx) => {
                return (
                    <Card key={idx} className='card__section'
                        selectedCard={selectedCard}
                        card_id={card.card_id} title={card.chat_title} region={card.region} date={card.date.slice(0, 10)} time={card.time} headCount={card.headcount}
                        current_headcount={card.current_headcount}
                        restaurant={card.restaurant_name}
                        myCard={card}
                        cardClickinMainHandler={cardClickinMainHandler}
                        cardClickinChatHandler={cardClickinChatHandler}
                        deleteCardModalHandler={deleteCardModalHandler}
                    />
                )
            })
                :
                <div className='loader__box__ifnull'> {nullText}</div>
            }
        </div>
    )
}

export default CardsList
