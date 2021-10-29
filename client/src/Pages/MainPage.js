import React from 'react';
import { useState, useEffect } from 'react';
import Search from '../Component/Search';
import List from '../Component/List';
import LoginModal from '../Modal/LogInModal';
import JoinModal from '../Modal/JoinModal';
import './MainPage.css';
import axios from 'axios';

function MainPage() {
  
  const [searchingRegion, setRegion] = useState('용산구')
  const [searchingDate, setDate] = useState('카드를 클릭하여 맞밥 약속에 참여해보세요!')

  const [cardData, setCardData] = useState(null)
  const [message, setMessage] = useState(null)

  
  const searchCardHandler = async (region, date) => {
    const result = await axios.get(`http://localhost:80/card?region=${region}&date=${date}`)
    if (!result) {
      setMessage('whghl');
    } else {
      setCardData(result);
    }
  }

  return (
    <div className='mainpage'>
      
      <Search className='mainpage__search__component' searchCardHandler={searchCardHandler} searchingRegion={searchingRegion} searchingDate={searchingDate}/>
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
