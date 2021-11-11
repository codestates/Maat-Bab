import React from 'react';
import '../Modal/ExitModal.css';


function ExitModal({ card_id, chat_title, deleteCardHandler, setIsDeleteClicked, isHost, hostDeleteCardHandler}) {
    const closeHandler = () => {
        setIsDeleteClicked(false)
    }
    return (
        <div className='exitmodal__background' onClick={closeHandler}>
            <div className='modalbackdrop exit'>
                <div className='modalview exit'>
                    <div className='modalview__massage exit'> 채팅방 [{chat_title}] 에서 나가시겠습니까?</div>
                    
                    { !isHost ?
                        <div><div className='modalview__count__message exit'>{`'나가기'를 누르면
                        나의 약속카드 및 채팅방에서 해당 항목이 제외됩니다.`} </div>
                            <button className='modalview__button exit' onClick={() => deleteCardHandler(card_id)}>나가기</button>
                            </div>
                        :
                        <div>
                    <div className='modalview__count__message exit'>{`'나가기'는
                        나의 약속카드 및 채팅방에서 해당 항목을 제외합니다.`} </div>
                    <div className='modalview__count__message exit host'>{`※'삭제하기'는 참여자 및 카드가 전부 삭제합니다.`} </div>
                    <button className='modalview__button exit' onClick={() => deleteCardHandler(card_id)}>나가기</button>
                    <button className='modalview__button exit host' onClick={() => hostDeleteCardHandler(card_id)}>삭제하기</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ExitModal
