import React from 'react';
import { useState, useEffect } from 'react';
import Search from '../Component/Search';
import List from '../Component/List';
import JoinModal from '../Modal/JoinModal';
import './MainPage.css';
import axios from 'axios';
import { getFormatDate1 } from '../functions/module';

function MainPage({ userInfo }) {
  const [curnPlace, setCurnPlace] = useState('');
  const [cardData, setCardData] = useState(null);
  const [message, setMessage] = useState(null);
  const [isCardClicked, setCardClicked] = useState(false);
  const [clickedCardId, setClickedCardId] = useState(null);

  const searchCardHandler = async (region, date, restaurant_name) => {
    const formatedDate = getFormatDate1(date);
    const result = await axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/card?region=${decodeURIComponent(
          region
        )}&date=${formatedDate}&restaurant_name=${decodeURIComponent(
          restaurant_name
        )}`
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
    if (result) {
      setCardData(result);
    } else {
      setMessage('조회된 약속이 없습니다. 맞밥 약속을 직접 만들어 보세요!');
      setCardData(null);
    }
  };

  const cardClickinMainHandler = (card) => {
    setClickedCardId(card.card_id);
    setCardClicked(true);
  };

  return (
    <div className='mainpage'>
      {isCardClicked ? (
        <JoinModal
          user_id={userInfo.user_id}
          card_id={clickedCardId}
          setCardClicked={setCardClicked}
        />
      ) : null}
      <Search
        className='mainpage__search__component'
        searchCardHandler={searchCardHandler}
        setCurnPlace={setCurnPlace}
        curnPlace={curnPlace}
      />
      <List
        className='mainpage__list__component'
        title={'맞밥 약속 목록'}
        cardData={cardData}
        message={message}
        cardClickinMainHandler={cardClickinMainHandler}
      />
    </div>
  );
}

export default MainPage;
