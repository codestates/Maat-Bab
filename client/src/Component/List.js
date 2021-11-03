import React from 'react';
import CardsList from './CardsList';
import './List.css';

function List({ user_id, title, cardData, message, cardClickinMainHandler, cardClickinChatHandler, myCardList, curCard_Id, setCurCard_Id, setIsModal,
    myCard, setMyCardList, setSelectedCard, selectedCard, leaveRoom, socket, deleteCardHandler
}) {
    return (
        <div className='list'>
            <div className='list__header'>
                <div className='list__header__title'>{title} 🍴</div>
                <div className='list__header__text'>{message}</div>
            </div>
            <section className='card__list__section'>
                <CardsList user_id={user_id} cardData={cardData}
                    cardClickinMainHandler={cardClickinMainHandler}
                    cardClickinChatHandler={cardClickinChatHandler}
                    myCardList={myCardList}
                    curCard_Id={curCard_Id} setCurCard_Id={setCurCard_Id}
                    myCard={myCard} setMyCardList={setMyCardList} setSelectedCard={setSelectedCard} selectedCard={selectedCard} leaveRoom={leaveRoom} socket={socket} deleteCardHandler={deleteCardHandler}
                />
            </section>
        </div>
    )
}

export default List
