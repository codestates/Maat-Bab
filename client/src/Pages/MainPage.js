import React from 'react';
import { useState, useEffect } from 'react';
import Search from '../Component/Search';
import List from '../Component/List';
import JoinModal from '../Modal/JoinModal';
import './MainPage.css';
import axios from 'axios';
import { getFormatDate1 } from '../functions/module';

function MainPage({ isLogin, userInfo }) {
  const [curnPlace, setCurnPlace] = useState('');
  console.log(
    'after click pinmarker state curnPlace in MainPage is: ',
    curnPlace
  );

  const [cardData, setCardData] = useState(null);
  const [message, setMessage] = useState(null);

  const searchCardHandler = async (region, date, restaurant_name) => {
    const formatedDate = getFormatDate1(date);
    const result = await axios
      .get(
        `http://localhost:${
          process.env.REACT_APP_SERVER_PORT
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

  const [isCardClicked, setCardClicked] = useState(false);
  const [clickedCardId, setClickedCardId] = useState(null);

  const cardClickinMainHandler = (id) => {
    console.log('card clicked');
    // 모달 -> 거기서 참여하기 클릭 시
    // : 나의 약속에 추가하기
    // 그런 다음 '/chatpage' 리디렉션
    setClickedCardId(id);
    setCardClicked(true);
    console.log(
      `clickedCardId : ${clickedCardId} isCardClicked ? ${isCardClicked}`
    );
  };

  useEffect(() => {
    console.log(`clickedCardId is ${clickedCardId}`);
  }, [clickedCardId]);

  return (
    <div className='mainpage'>
      {isCardClicked ? (
        <JoinModal user_id={userInfo.user_id} card_id={clickedCardId} />
      ) : null}
      <Search
        className='mainpage__search__component'
        searchCardHandler={searchCardHandler}
        setCurnPlace={setCurnPlace}
        curnPlace={curnPlace}
      />
      {/* 조회된 전체 약속카드 목록 */}
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
