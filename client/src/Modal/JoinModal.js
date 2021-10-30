import React from 'react'
import { useHistory } from 'react-router-dom';
import '../Modal/JoinModal.css';

function JoinModal() {
    const history = useHistory();
    const joinHandler = () => {
        console.log('join button clicked');
        history.push('/chat')
    }

    return (
        <div className='joinmodal__background'>
            <div className='modalbackdrop join'>
                <div className='modalview join'>
                    <div className='modalview__massage join'>  맞밥 약속에 참여하시겠습니까?</div>
                    <div className='modalview__count__massage join'>{`'참여하기'를 누르면
                        나의 약속 및 채팅 페이지로
                        이동합니다 🏃🏼‍♀️💨`} </div>
                    <button className='modalview__button join' onClick={joinHandler}>참여하기</button>
                </div>
            </div>
        </div>
    )
}

export default JoinModal
