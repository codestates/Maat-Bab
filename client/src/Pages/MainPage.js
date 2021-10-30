import React from 'react';
import { useState, useEffect } from 'react';
import Search from '../Component/Search';
import List from '../Component/List';
import LoginModal from '../Modal/LogInModal';
import JoinModal from '../Modal/JoinModal';
import './MainPage.css';
import axios from 'axios';
import { getFormatDate1 } from '../functions/module';

function MainPage({ isLogin }) {
  
  const [curnPlace, setCurnPlace] = useState('');
  console.log('after click pinmarker state curnPlace in MainPage is: ', curnPlace )

  const [cardData, setCardData] = useState(null)
  const [message, setMessage] = useState(null)
  
  const searchCardHandler = async (region, date, restaurant_name) => {
    const formatedDate = getFormatDate1(date);
    const result = await axios.get(`http://localhost:80/card?region=${decodeURIComponent(region)}&date=${formatedDate}&restaurant_name=${decodeURIComponent(restaurant_name)}`)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
      if (result) {
        setCardData(result);
      } else {
        setMessage('조회된 약속이 없습니다. 맞밥 약속을 직접 만들어 보세요!');
        setCardData(null);
      }
  }

  const [isCardClicked, setCardClicked] = useState(false);

  const cardClickHandler = () => {
    console.log('card clicked');
    // 모달 -> 거기서 참여하기 클릭 시 
    // : 나의 약속에 추가하기
    // 그런 다음 '/chatpage' 리디렉션
    setCardClicked(true);
    console.log(isCardClicked);
  }
  
  return (
    <div className='mainpage'>
      {isCardClicked ? <JoinModal /> : null}
      <Search className='mainpage__search__component'
        searchCardHandler={searchCardHandler}

        setCurnPlace={setCurnPlace}
        curnPlace={curnPlace}

      />
      
      {/* 조회된 전체 약속카드 목록 */}
      <List className='mainpage__list__component' title={'맞밥 약속 목록'} cardData={cardData} message={message} cardClickHandler={cardClickHandler}/>

      {/* 로그인 모달창(로그인X 유저)
      Search > SearchBar > '약속 만들기' 버튼 클릭 시
      List > CardsList > Card 컴포넌트 클릭 시 
       */}
      <LoginModal />

    </div>
  )
}

export default MainPage
