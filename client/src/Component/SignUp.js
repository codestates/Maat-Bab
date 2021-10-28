import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './SignUp.css';
import axios from 'axios';

function SignUp({ email, setEamil, certificationCodeHandler }) {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [ChPassWord, setChPassWord] = useState('');
  const [overlap, setOverlap] = useState(false);

  const onChange1 = (e) => {
    setPassWord(e.target.value);
  };
  const onChange2 = (e) => {
    setChPassWord(e.target.value);
  };
  const onChange3 = (e) => {
    setEamil(e.target.value);
  };
  const onchange4 = (e) => {
    setUserName(e.target.value);
  };
  const isEmail = (asValue) => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
  };
  const validatePassword = (character) => {
    return /(?=.*[~`!@#$%\^&*()-+=]{1,50})/.test(character);
  };
  const generateCertificationCode = () => {
    const el = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const string_length = 20;
    let result = '';
    for (let i = 0; i < string_length; i++) {
      const rnum = Math.floor(Math.random() * el.length);
      result += el.substring(rnum, rnum + 1);
    }

    return result;
  };
  const pathChange = async () => {
    if (
      email === '' ||
      passWord === '' ||
      ChPassWord === '' ||
      userName === '' ||
      passWord !== ChPassWord
    ) {
      return;
    } else if (!validatePassword(passWord)) {
      return alert('비밀번호는 특수문자 하나이상을 포함해야합니다');
    } else if (overlap === false) {
      alert('중복검사를 먼저 해주세요');
    } else {
      let res = await axios.post('http://localhost:80/signup', {
        email: email,
        name: userName,
        password: passWord,
      });
      if (res.status === 201) {
        const certificationCode = generateCertificationCode();
        axios.post(`http://localhost:80/mail`, {
          email,
          certificationCode,
        });
        certificationCodeHandler(certificationCode);
        setTimeout(() => {
          history.push('/emailcheck');
        }, 1000);
      }
    }
  };
  const overlapHandler = () => {
    if (!isEmail(email)) {
      alert('올바른 이메일형식이 아닙니다');
    } else {
      axios
        .post('http://localhost:80/same-email', { email: email })
        .then((res) => {
          if (res.status === 204) {
            alert('사용가능한 이메일입니다');
            setOverlap(true);
          } else {
            alert('사용불가능한 이메일입니다');
          }
        });
    }
  };

  return (
    <div className='signup__background'>
      <div className='signup__content__container'>
        <h2 className='signup__title'>회원가입</h2>
        <div className='signup__container'>
          <div className='signup__container__row email'>
            <div className='signup__item'>E-Mail</div>
            <input
              onChange={(e) => onChange3(e)}
              disabled={overlap ? 'disabled' : ''}
              type='email'
              className='signup__email'
              placeholder='이메일'
            ></input>
            <button onClick={overlapHandler} className='signup__check__email'>
              중복확인
            </button>
            <div className='signup__errormessage'>※ 인증메일이 발송됩니다</div>
          </div>
          <div className='signup__container__row password'>
            <div className='signup__item'>PassWord</div>
            <input
              type='password'
              onKeyUp={(e) => onChange1(e)}
              className='signup__password'
              placeholder='특수문자를 포함해야합니다'
            ></input>
          </div>
          <div className='signup__container__row passwordcheck'>
            <div className='signup__item'>PassWord Check</div>
            <input
              type='password'
              onKeyUp={(e) => onChange2(e)}
              className='signup__passwordcheck'
              placeholder='비밀번호 확인'
            ></input>
            <div
              className={
                passWord !== ChPassWord
                  ? 'signup__errormessage'
                  : 'signup__errormessage hide'
              }
            >
              ※ 비밀번호가 일치하지 않습니다
            </div>
          </div>
          <div className='signup__container__row username'>
            <div className='signup__item'>User Name</div>
            <input
              onChange={(e) => onchange4(e)}
              type='text'
              className='signup__username'
              placeholder='사용자 이름'
            ></input>
          </div>
        </div>
        <div className='signup__button__container'>
          <button className='signup__button' onClick={pathChange}>
            회원 가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;