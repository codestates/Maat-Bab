import React, { useState } from 'react';
import './SignIn.css';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginStatus, setUserInfo } from '../actions';
import axios from 'axios';

function SignIn() {
    const [isErr, setIsErr] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const dispatch = useDispatch();
    const loginState = useSelector(state => state.userReducer);


    const emailInput = (e) => {
        setEmailValue(e.target.value)
        if(!emailValue.includes('@')){
            setIsErr(true)
        }else{
            setIsErr(false)
        }
    }

    const passwordInput = (e) => {
        setPasswordValue(e.target.value)
    }
    const loginHandler = () => {
        axios.post('http://localhost4000/signin',{email:emailValue, password: passwordValue})
        .then((res) => console.log(res))
        // dispatch(setLoginStatus(true))
    }
    return (
        <div>
            <div className='login__container'>
                <div className='signin__content__container'>
                    <h1 className='signin__title'>로그인</h1>
                    <ul className='signin__content__container__ul'>
                        <li className='signin__container__li__input'>
                            <div className='signin__name'>E-mail</div>
                            <input className='signin__input email' placeholder='이메일을 입력해주세요' type='email' onKeyUp={(e) => emailInput(e)}/>
                            <div className={`signin__email__message ${isErr ? null : 'hide'}`}>※ 올바른 이메일 형식을 입력해주세요</div>
                        </li>
                        <li className='signin__container__li__input'>
                            <div className='signin__name'>비밀번호</div>
                            <input className='signin__input password' placeholder='비밀번호를 입력해주세요' type='password' onKeyUp={(e) => passwordInput(e)}/>
                        </li>
                    </ul>
                    <a href='/signup' className='signin__link__signup'>회원이 아니신가요?</a>
                    <ul className='signin__button__container'>
                        <li><button onClick={loginHandler} className='signin__button__login'>로그인</button></li>
                        <li><button className='signin__button__login__google'><div className='google__logo'></div>구글 로그인</button></li>
                        <li><button className='signin__button__login__kakao'><div className='kakao__logo'></div>카카오톡 로그인</button></li>
                    </ul>
                </div>
            </div>            
        </div>
    )
}

export default SignIn
