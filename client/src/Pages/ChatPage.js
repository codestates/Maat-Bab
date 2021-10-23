import React from 'react';
import List from '../Component/List';
import ChatBox from '../Component/ChatBox';
import MateList from '../Component/MateList';

function ChatPage() {
  return (
    <div className='chatpage'>
      
      {/* 나의 약속 카드 목록 */}
      <List />

      <ChatBox />
      <MateList />

    </div>
  )
}

export default ChatPage
