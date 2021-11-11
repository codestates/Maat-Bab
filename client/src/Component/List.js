import React from 'react';
import CardsList from './CardsList';
import './List.css';

function List({
  title,
  cardData,
  check_messages,
  message,
  cardClickinMainHandler,
  cardClickinChatHandler,
  setSelectedCard,
  selectedCard,
  deleteCardModalHandler,
}) {

    return (
        <div className='list__background'>
            <div className='list__header'>
                <div className='list__header__title'>{title} 🍴</div>
                <div className='list__header__text'>{message}</div>
            </div>
            <section className='card__list__section'>
                <CardsList
                    cardData={cardData} selectedCard={selectedCard} setSelectedCard={setSelectedCard}
                    cardClickinMainHandler={cardClickinMainHandler} cardClickinChatHandler={cardClickinChatHandler} deleteCardModalHandler={deleteCardModalHandler}
                /> 
            </section>
        </div>
    )
}

export default List;
