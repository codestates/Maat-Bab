import React from 'react';
import Search from '../Component/Search';
import List from '../Component/List';
import LoginModal from '../Modal/LogInModal';
import JoinModal from '../Modal/JoinModal';
import './MainPage.css';

function MainPage() {
  
  return (
    <div className='mainpage'>
      
      <Search className='mainpage__search__component'/>
      {/* 조회된 전체 약속카드 목록 */}
      <List title={'맞밥 약속 목록'} className='mainpage__list__component'/>

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
