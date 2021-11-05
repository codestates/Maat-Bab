import React, { useState } from 'react';
import './EmailCheck.css';
import FailModal from '../Modal/FailModal';
import SuccessModal from '../Modal/SuccessModal';
import axios from 'axios';

function EmailCheck({ certificationCode, email }) {
  const [value, setValue] = useState('');
  const [modal, setModal] = useState('');

  const onchange = (e) => {
    setValue(e.target.value);
  };

  const checkCode = async () => {
    if (value === certificationCode) {
      axios.patch(
        `${process.env.REACT_APP_API_URL}/certification`,
        {
          email,
        }
      );
      setModal('success');
    } else {
      alert('인증번호가 일치하지 않습니다');
    }
  };
  const reSend = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/mail`, {
      email,
      certificationCode,
    });
  };
  return (
    <div className='emailcheck__background'>
      {modal === 'success' ? <SuccessModal /> : null}
      <div className='emailcheck__content__container'>
        <h2 className='emailcheck__title'>이메일 인증</h2>
        <ul className='emailcheck__messages__cocntainer'>
          <li className='emailcheck__messages__cocntainer__message1'>
            회원님은 임시 가입 상태입니다
          </li>
          <li className='emailcheck__messages__cocntainer__message2'>
            가입하신 이메일로 인증 메일이 발송되었습니다
            <br>
            메일을 확인해주세요
            </br>
          </li>
        </ul>
        <div className='emailcheck__button__container'>
          <div className='emailcheck__button__email__input__div'>
            <input
              onChange={(e) => onchange(e)}
              type='text'
              placeholder='인증번호를 입력해주세요'
              className='emailcheck__button__email__input'
            ></input>
          </div>
          <div className='emailcheck__send__button__div'>
            <button onClick={checkCode} className='emailcheck__send__button'>
              확인
            </button>
          </div>
          <button onClick={reSend} className='emailcheck__button__send__button'>
            인증메일 다시 보내기
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailCheck;
