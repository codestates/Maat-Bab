import React from 'react';
import './ChatBoxJoin.css';


function ChatBoxJoin({setIsModal, setIsFirst}) {
  
  const closeModal = () =>{
    setIsModal(false)
  }

  const openChatBox = () => {
    setIsFirst(false)
  }
  return (
    <div onClick={closeModal} className='chatboxjoin__bacground'>
      <div className='chatboxjoin__content'>
        <div className='chatboxjoin__title'>맞밥 약속에 참여 <br/>하시겠습니까?</div>
        <div className='chatboxjoin__logo'></div>
        <button onClick={openChatBox} className='chatboxjoin__button'>맞밥하기</button>
      </div>
      
    </div>
  )
}

export default ChatBoxJoin
