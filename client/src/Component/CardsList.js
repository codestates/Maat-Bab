import React from 'react';
import Card from './Card';
import './CardsList.css';

function CardsList({ cardData, cardClickinMainHandler, cardClickinChatHandler,  myCardList, curCard_Id, setCurCard_Id, selectedCard}) {
    // console.log('cardData: ', cardData);

    return (
        <div className='cardslist'>
            {!myCardList ? (
                cardData ?
                cardData?.map(card => {
                    return (
                        <Card className='card__section'
                            card_id={card.card_id}
                            title={card.chat_title}
                            region={card.region} date={card.date.slice(0, 10)} time={card.time} headCount={card.headcount} restaurant={card.restaurant_name}
                        cardClickinMainHandler={cardClickinMainHandler}
                        /> 
                    )
                })
                    :
                <div className='loader__box__ifnull'> 맞밥 약속을 조회해 보세요!</div>
            ) :
                myCardList.map(myCard => {
                    return (
                        <Card className='card__section'
                            card_id={myCard.Card.card_id}
                            title={myCard.Card.chat_title}
                            region={myCard.Card.region} date={myCard.Card.date.slice(0, 10)} time={myCard.Card.time} headCount={myCard.Card.headcount} restaurant={myCard.Card.restaurant_name}
                            myCard={myCard}
                        cardClickinChatHandler={cardClickinChatHandler}
                        />
                    )
                })
                    }
            {/* {myCardList || cardData ?
                (myCardList && !cardData ? 
                    myCardList.map(myCard => {
                        return (
                            <Card className='card__section'
                                card_id={myCard.Card.card_id}
                                title={myCard.Card.chat_title}
                                region={myCard.Card.region} date={myCard.Card.date.slice(0, 10)} time={myCard.Card.time} headCount={myCard.Card.headcount} restaurant={myCard.Card.restaurant_name}
                                myCard={myCard}
                            cardClickinChatHandler={cardClickinChatHandler}
                            />
                        )
                    })
                    :
                    cardData.map(card => {
                        return (
                            <Card className='card__section'
                                card_id={card.card_id}
                                title={card.chat_title}
                                region={card.region} date={card.date.slice(0, 10)} time={card.time} headCount={card.headcount} restaurant={card.restaurant_name}
                            cardClickinMainHandler={cardClickinMainHandler}
                            />
                        )
                    })
                    )
                :
                <div className='loader__box__ifnull'> 맞밥 약속을 조회해 보세요!</div>
                } */}
        </div>
    )
}

export default CardsList
