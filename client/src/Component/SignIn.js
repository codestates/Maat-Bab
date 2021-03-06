import React, { useState } from 'react';
import './SignIn.css';
import { useDispatch } from 'react-redux';
import { setLoginStatus, setUserInfo } from '../actions';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login'
function SignIn({ isSiginInModal }) {
  const history = useHistory();
  const [isErr, setIsErr] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const dispatch = useDispatch();
  const URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=https://www.maat-bab.com/kakao&response_type=code`;
  const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_API_KEY
  const emailInput = (e) => {
    setEmailValue(e.target.value);
    if (!emailValue.includes('@')) {
      setIsErr(true);
    } else {
      setIsErr(false);
    }
  };
  const passwordInput = (e) => {
    setPasswordValue(e.target.value);
  };
  const loginHandler = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/signin`, {
        email: emailValue,
        password: passwordValue,
      })
      .then((res) => {
        if (res.status === 200) {
          let data = res.data;
          dispatch(setLoginStatus(true));
          dispatch(
            setUserInfo(
              data.user_id,
              data.email,
              data.name,
              data.etiqette,
              data.oauth,
              data.certification
            )
          );
          document.location.href = '/'
        }
      })
      .catch(err => {
        if(err.response.status === 400){
          alert('이메일 또는 비밀번호를 입력해 주세요')
        }else if(err.response.status === 403){
          alert('비밀번호를 다시 입력해 주세요')
        }else if(err.response.status === 404){
          alert('존재하지 않는 이메일입니다')
        }else{
          console.log(err)
        }
      })
  };
  const kakaoLogin = () => {
    window.location.href = URL;
  };
  const responseGoogle = (response) => {
    axios.post(`${process.env.REACT_APP_API_URL}/google`,{data:response})
    .then(res => {
      if(res.status === 200 || res.status === 201){
        let data = res.data;
        dispatch(setLoginStatus(true))
        dispatch(setUserInfo(
          data.user_id,
          data.email,
          data.name,
          data.etiqette,
          data.oauth,
          data.certification
        ))
        history.push('/main')
      }
    })
  }
  const onFailed = (err) => {
    console.log(err)
  }
  const enterLogin = (e) => {
    if(e.key === 'Enter'){
      loginHandler()
    }
  }
  return (
    <div>
      {/* <div className= {isSiginInModal ? 'login__container loginModal' : 'login__container'} > */}
      {!isSiginInModal ? (
        <div className='login__container'>
          <div className='signin__content__container'>
            <h1 className='signin__title loginModal'>로그인</h1>
            <ul className='signin__content__container__ul'>
              <li className='signin__container__li__input'>
                <div className='signin__name'>E-mail</div>
                <input
                  className='signin__input email'
                  placeholder='이메일을 입력해주세요'
                  type='email'
                  onKeyUp={(e) => emailInput(e)}
                />
                <div
                  className={`signin__email__message ${isErr ? null : 'hide'}`}
                >
                  ※ 올바른 이메일 형식을 입력해주세요
                </div>
              </li>
              <li className='signin__container__li__input'>
                <div className='signin__name'>비밀번호</div>
                <input
                  onKeyPress={(e) => enterLogin(e)}
                  className='signin__input password'
                  placeholder='비밀번호를 입력해주세요'
                  type='password'
                  onKeyUp={(e) => passwordInput(e)}
                />
              </li>
            </ul>
            <a href='/signup' className='signin__link__signup loginModal'>
              회원이 아니신가요?
            </a>
            <ul className='signin__button__container'>
              <li className='signin__button__li'>
                <button
                  onClick={loginHandler}
                  className='signin__button__login'
                >
                  로그인
                </button>
              </li>
              <li className='signin__button__li'>
                <GoogleLogin
                  clientId={GOOGLE_KEY}
                  onSuccess={responseGoogle}
                  onFailure={onFailed}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <button onClick={renderProps.onClick} className='signin__button__google__login'/>
                  )}
                />
              </li>
              <li className='signin__button__li'>
                <button
                  onClick={kakaoLogin}
                  className='signin__button__login__kakao'
                ></button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className='login__container loginModal'>
          {/* <div className= {isSiginInModal ? 'login__container loginModal' : 'login__container'} > */}
          <div className='signin__content__container loginModal'>
            <h1 className='signin__title'>로그인</h1>
            <ul className='signin__content__container__ul loginModal'>
              <li className='signin__container__li__input loginModal'>
                <div className='signin__name loginModal'>E-mail</div>
                <input
                  className='signin__input email loginModal'
                  placeholder='이메일을 입력해주세요'
                  type='email'
                  onKeyUp={(e) => emailInput(e)}
                />
                <div
                  className={`signin__email__message loginModal ${
                    isErr ? null : 'hide'
                  }`}
                >
                  ※ 올바른 이메일 형식을 입력해주세요
                </div>
              </li>
              <li className='signin__container__li__input loginModal'>
                <div className='signin__name loginModal'>비밀번호</div>
                <input
                  className='signin__input password loginModal'
                  placeholder='비밀번호를 입력해주세요'
                  type='password'
                  onKeyUp={(e) => passwordInput(e)}
                />
              </li>
            </ul>
            <a href='/signup' className='signin__link__signup'>
              회원이 아니신가요?
            </a>
            <ul className='signin__button__container loginModal'>
              <li className='signin__button__li'>
                <button
                  onClick={loginHandler}
                  className='signin__button__login loginModal'
                >
                  로그인
                </button>
              </li>
              <li className='signin__button__li'>
                <GoogleLogin
                  clientId={GOOGLE_KEY}
                  onSuccess={responseGoogle}
                  onFailure={onFailed}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <button onClick={renderProps.onClick} className='signin__button__google__login'/>
                  )}
                />
              </li>
              <li className='signin__button__li'>
                <button
                  onClick={kakaoLogin}
                  className='signin__button__login__kakao loginModal'
                >
                  <div className='kakao__logo loginModal'></div>카카오톡 로그인
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn;
