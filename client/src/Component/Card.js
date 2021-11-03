import React from 'react';
import './Card.css';
import { MdExitToApp } from 'react-icons/md';

function Card({
    card_id, title, region, date, time, headCount, myCard,
    cardClickinMainHandler, cardClickinChatHandler, deleteCardModalHandler }) {

    return (
        <div className='card'>
        {cardClickinMainHandler && !cardClickinChatHandler ? 
            <div className='card__container'>
                <div className='card__first__container'>
                    <div className='card__title'>{title}</div>
                </div>
            <div className='card__second__container'>
            <span className='card__region'>서울시 {region}</span>
                <span className='card__date'>{date}</span>
            </div>
            <div className='card__third__container'>
            <span className='card__time'>{time}</span>
            <span className='card__headcount'>{headCount}명</span>
            </div>
        <div className='card__hover__message' onClick={() => cardClickinMainHandler(card_id)}>채팅하기</div>
        </div>
        :
            <div className='card__container'>
            <div className='card__first__container'>
                <div className='card__title'>{title}</div>
                        <MdExitToApp className='chat__exit__button' onClick={()=>deleteCardModalHandler()}/>
            </div>
            <div className='card__second__container'>
            <span className='card__region'>서울시 {region}</span>
                <span className='card__date'>{date}</span>
            </div>
            <div className='card__third__container'>
            <span className='card__time'>{time}</span>
            <span className='card__headcount'>{headCount}명</span>
            </div>
        <div className='card__hover__message joined' onClick={() => cardClickinChatHandler(myCard)}>채팅하기</div>
        </div>        
        }
        </div>
    )
}

export default Card