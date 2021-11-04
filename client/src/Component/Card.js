import React from 'react';
import './Card.css';
import { MdExitToApp } from 'react-icons/md';

function Card({
    card_id, title, region, date, time, headCount,
    myCard, selectedCard,
    cardClickinMainHandler, cardClickinChatHandler, deleteCardModalHandler }) {

    let cardClickHandler;
    if (cardClickinChatHandler && !cardClickinMainHandler) {
        cardClickHandler = cardClickinChatHandler;
    } else if (cardClickinMainHandler && !cardClickinChatHandler) {
        cardClickHandler = cardClickinMainHandler
    }

    const isJoined = () => selectedCard.card_id === card_id && selectedCard ? true : false

    return (
        <div className='card'>

            <div className={isJoined() ? 'card__container joined' : 'card__container'}>
                <div className='card__first__container'>
                    <div className='card__title'>{title}</div>
                    {cardClickinChatHandler ? (selectedCard.card_id===card_id ? <MdExitToApp className='chat__exit__button joined' onClick={() => deleteCardModalHandler()} />
                        :
                        <MdExitToApp className='chat__exit__button' onClick={() => deleteCardModalHandler()} disabled />
                    ) : null}
                </div>
            <div className='card__second__container'>
            <span className='card__region'>서울시 {region}</span>
                <span className='card__date'>{date}</span>
            </div>
            <div className='card__third__container'>
            <span className='card__time'>{time}</span>
            <span className='card__headcount'>{headCount}명</span>
            </div>
                {selectedCard.card_id===card_id ? <div className='card__hover__message joined' onClick={() => deleteCardModalHandler(myCard)}>나가기</div>
                    :
                    <div className='card__hover__message' onClick={() => cardClickHandler(myCard)}>채팅하기</div>
        }
        </div>
        </div>
    )
}

export default Card