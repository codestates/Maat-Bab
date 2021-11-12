import React, { useCallback } from 'react';
import './Card.css';
import { MdExitToApp } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Card({
  card_id,
  title,
  region,
  date,
  time,
  headCount,
  current_headcount,
  myCard,
  selectedCard,
  cardClickinMainHandler,
  cardClickinChatHandler,
  deleteCardModalHandler,
  check_messages,
}) {
  let cardClickHandler;
  if (cardClickinChatHandler && !cardClickinMainHandler) {
    cardClickHandler = cardClickinChatHandler;
  } else if (cardClickinMainHandler && !cardClickinChatHandler) {
    cardClickHandler = cardClickinMainHandler;
  }

  const isJoined = () =>
    selectedCard && selectedCard.card_id === card_id ? true : false;

  const isOnBell = (card_id) => {
    if (check_messages !== null) {
      return check_messages.filter(
        (check_message) => check_message.card_id === card_id
      )[0].check_message;
    }
    return false;
  };

  return (
    <div className='card'>
      <div
        className={isJoined() ? 'card__container joined' : 'card__container'}
      >
        <div className='card__first__container'>
          <div className='card__title'>{title}</div>
          {cardClickinChatHandler ? (
            isJoined() ? (
              <MdExitToApp
                className='chat__exit__button joined'
                onClick={() => deleteCardModalHandler()}
              />
            ) : (
              <MdExitToApp
                className='chat__exit__button'
                onClick={() => deleteCardModalHandler()}
                disabled
              />
            )
          ) : null}
        </div>
        <div className='card__second__container'>
          <span className='card__region'>서울시 {region}</span>
          <span className='card__date'>{date}</span>
        </div>
        <div className='card__third__container'>
          <span className='card__time'>{time}</span>
          <span className='card__headcount'>
            {current_headcount} / {headCount} 명
          </span>
          {isOnBell(card_id) ? (
            <span className='card__bell__icon'>
              <FontAwesomeIcon icon={faBell} />
            </span>
          ) : (
            <span className='card__bell__icon bell__false__color'>
              <FontAwesomeIcon icon={faBell} />
            </span>
          )}
        </div>
        {isJoined() ? (
          <div
            className='card__hover__message joined'
            onClick={() => deleteCardModalHandler(myCard)}
          >
            나가기
          </div>
        ) : (
          <div
            className='card__hover__message'
            onClick={() => cardClickHandler(myCard)}
          >
            채팅하기
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
