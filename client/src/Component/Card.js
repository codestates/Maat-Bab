import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
import './Card.css';

function Card() {

// state join 여부, flip 여부
// props title, region, date, time, headcount(:현재 참여자.. => card 테이블에서 필드 추가?)

    return (
        <div className='card'>
            {/* <div className='card__container joined'> joined </div>*/}
            {/* <div className='card__container flipped'> flip </div> */}
            <div className='card__container'>
                <div className='card__first__container'>
                <div className='card__title'>La Cruda</div>
                </div>
                <div className='card__second__container'>
                <span className='card__region'>서울시 용산구</span>
                <span className='card__date'>2021.10.29</span>
                </div>
                <div className='card__third__container'>
                <span className='card__time'>저녁</span>
                <span className='card__headcount'>1/2명</span>
                </div>
            {/* <div className='card__hover__message'>채팅하기</div> */}
            {/* <div className='card__hover__message joined'>채팅방 나가기</div> */}
            </div>
        </div>
    )
}

export default Card
