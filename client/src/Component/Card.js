import React from 'react';
import './Card.css';

function Card({ region, date, time, headCount, title, cardClickinMainHandler}) {

// state join 여부, flip 여부
// props title, region, date, time, headcount(:현재 참여자.. => card 테이블에서 필드 추가?)
    
    return (
        <div className='card'>
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
            {/* <div className='card__hover__message joined'>채팅방 나가기</div> */}
                </div>
            <div className='card__hover__message' onClick={cardClickinMainHandler}>채팅하기</div>
            </div>
            
        </div>
    )
}

export default Card
