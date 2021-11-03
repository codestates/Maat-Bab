import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../Modal/JoinModal.css';

function JoinModal({ user_id, card_id }) {
  const history = useHistory();
  const joinHandler = async (card_id) => {
    console.log('join button clicked');
    console.log('card_id: ', card_id);
    await axios
      .post(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT}/card/${user_id}`,
        {
          card_id,
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    console.log(`clicked card_id in Main: ${card_id} 번 카드 post 처리됨`);
    history.push('/chat');
  };

    return (
        <div className='joinmodal__background'>
            <div className='modalbackdrop join'>
                <div className='modalview join'>
                    <div className='modalview__massage join'>  맞밥 약속에 참여하시겠습니까?</div>
                    <div className='modalview__count__message join'>{`'참여하기'를 누르면
                        나의 약속 및 채팅 페이지로
                        이동합니다 🏃🏼‍♀️💨`}{' '}
          </div>
          <button
            className='modalview__button join'
            onClick={() => joinHandler(card_id)}
          >
            참여하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinModal;
