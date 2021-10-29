import React from 'react';
import List from '../Component/List';
import ChatBox from '../Component/ChatBox';
import MateList from '../Component/MateList';
import './ChatPage.css';

function ChatPage() {
  return (
    <div className='chatpage'>
      
      {/* 나의 약속 카드 목록 */}
      <List title={'나의 맞밥 약속'} className='chatpage__list__container' />

      <ChatBox className='chatpage__chat__container' />
      <MateList className='chatpage__mate__container' />

    </div>
  )
}

export default ChatPage
