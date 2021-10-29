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

  const [cardData, setCardData] = useState(null)
  const [message, setMessage] = useState(null)
  
  const searchCardHandler = async (region, date, place) => {
    const formatedDate = getFormatDate1(date);
    const result = await axios.get(`http://localhost:80/card?region=${decodeURIComponent(region)}&date=${formatedDate}&place=${decodeURIComponent(place)}`)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
      if (result) {
        setCardData(result);
      } else {
        setMessage('조회된 약속이 없습니다. 맞밥 약속을 직접 만들어 보세요!');
      }
    // setCurnPlace(null);
  }

  return (
    <div className='mainpage'>
      
      <Search className='mainpage__search__component'
        searchCardHandler={searchCardHandler}
        setCurnPlace={setCurnPlace}
        curnPlace={curnPlace}
      />
      
      {/* 조회된 전체 약속카드 목록 */}
      <List className='mainpage__list__component' title={'맞밥 약속 목록'} cardData={cardData} message={message}/>

      {/* 로그인 모달창(로그인X 유저)
      Search > SearchBar > '약속 만들기' 버튼 클릭 시
      List > CardsList > Card 컴포넌트 클릭 시 
       */}
      <LoginModal />
      {/* 카드 클릭시 */}
      <JoinModal /> 

    </div>
  )
}

export default MainPage
