import React from 'react';
import Card from './Card';
import './CardsList.css';

function CardsList({ cardData, cardClickinMainHandler, cardClickinChatHandler, deleteCardModalHandler }) {

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
    
    console.log('cardList: ', cardList)

    return (
        <div className='cardslist'>

            {cardList ? cardList?.map(card => {
                    return (
                        <Card className='card__section'
                            card_id={card.card_id} title={card.chat_title} region={card.region} date={card.date.slice(0, 10)} time={card.time} headCount={card.headcount} restaurant={card.restaurant_name}
                            
                            myCard={card}
                            cardClickinMainHandler={cardClickinMainHandler}
                            cardClickinChatHandler={cardClickinChatHandler}
                            deleteCardModalHandler={deleteCardModalHandler}
                        />
                    )
            })
                :
                <div className='loader__box__ifnull'> 맞밥 약속을 조회해 보세요!</div>
            }
        </div>
    )
}

export default CardsList
