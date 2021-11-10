import React from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import '../Modal/JoinModal.css';

function JoinModal({ user_id, card_id, setCardClicked }) {
    const history = useHistory();
    const joinHandler = async (card_id) => {
        await axios
            .post(
                `${process.env.REACT_APP_API_URL}/card/${user_id}`,
                {card_id}
            )
            .then((res) => {
                if (res.status === 204) {
                    alert('인원이 다 찼습니다😅 다른 약속을 찾아봐 주세요!')
                } else if (res.status === 201) {
                    history.push('/chat');
                }
            })
    };

    const closeJoinModalHandler = () => {
        setCardClicked(false);
    }

    return (
        <div className='joinmodal__background' onClick={closeJoinModalHandler}>
            <div className='modalbackdrop join'>
                <div className='modalview join'>
                    <div className='modalview__massage join'>
                        맞밥 약속에 참여하시겠습니까?</div>
                    <div className='modalview__count__message join'>{
                            `'참여하기'를 누르면
                        나의 약속 및 채팅 페이지로
                        이동합니다 🏃🏼‍♀️💨`
                        }{' '}
                    </div>
                    <button className='modalview__button join' onClick={() => joinHandler(card_id)}>
                        참여하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default JoinModal;
