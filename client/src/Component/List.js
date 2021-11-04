import React from 'react';
import CardsList from './CardsList';
import './List.css';

function List({ title, cardData, message, cardClickinMainHandler, cardClickinChatHandler, myCardList, setMyCardList, setSelectedCard, selectedCard, deleteCardModalHandler
}) {
    return (
        <div className='list'>
            <div className='list__header'>
                <div className='list__header__title'>{title} 🍴</div>
                <div className='list__header__text'>{message}</div>
            </div>
            <section className='card__list__section'>
                {!myCardList ? <CardsList
                    cardData={cardData} setMyCardList={setMyCardList} selectedCard={selectedCard} setSelectedCard={setSelectedCard}
                    cardClickinMainHandler={cardClickinMainHandler} cardClickinChatHandler={cardClickinChatHandler} deleteCardModalHandler={deleteCardModalHandler}
                /> :
                <CardsList
                    myCardList={myCardList} setMyCardList={setMyCardList} selectedCard={selectedCard} setSelectedCard={setSelectedCard}
                    cardClickinMainHandler={cardClickinMainHandler} cardClickinChatHandler={cardClickinChatHandler} deleteCardModalHandler={deleteCardModalHandler}
                />}
            </section>
        </div>
    )
}

export default List
