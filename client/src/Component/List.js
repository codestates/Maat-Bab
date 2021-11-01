import React from 'react';
import CardsList from './CardsList';
import './List.css';

function List({ title, cardData, message, cardClickinMainHandler, myCardList, curCard, setCurCard, setIsModal }) {
    return (
        <div className='list'>
            <div className='list__header'>
                <div className='list__header__title'>{title} 🍴</div>
                <div className='list__header__text'>{message}</div>
            </div>
            <section className='card__list__section'>
                <CardsList cardData={cardData}
                    cardClickinMainHandler={cardClickinMainHandler}
                    myCardList={myCardList}
                    curCard={curCard} setCurCard={setCurCard}/>
            </section>
        </div>
    )
}

export default List
