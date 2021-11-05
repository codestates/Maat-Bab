import React from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import '../Modal/JoinModal.css';

function JoinModal({user_id, card_id}) {
    const history = useHistory();
    const joinHandler = async (card_id) => {
        await axios
            .post(
                `${process.env.REACT_APP_API_URL}/card/${user_id}`,
                {card_id}
            )
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
        history.push('/chat');
    };

    return (
        <div className='joinmodal__background'>
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
