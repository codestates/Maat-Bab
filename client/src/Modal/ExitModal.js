import React from 'react';
import '../Modal/ExitModal.css';


function ExitModal({ card_id, chat_title, deleteCardHandler, setIsDeleteClicked }) {
    const closeHandler = () => {
        setIsDeleteClicked(false)
    }
    return (
        <div className='exitmodal__background' onClick={closeHandler}>
            <div className='modalbackdrop exit'>
                <div className='modalview exit'>
            <div className='modalview__massage exit'> 채팅방 [{chat_title}] 에서 나가시겠습니까?</div>
                    <div className='modalview__count__message exit'>{`'나가기'를 누르면
                        나의 약속카드 및 채팅방은 사라집니다`} </div>
                    <button className='modalview__button exit' onClick={() => deleteCardHandler(card_id)}>나가기</button>
                </div>
            </div>
        </div>
    )
}

export default ExitModal
