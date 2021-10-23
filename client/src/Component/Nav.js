import React from 'react'
import './Nav.css';
import { useHistory } from 'react-router-dom';

function Nav({isLogin, logoutHandler}) {
    const history = useHistory()

    const MoveAbout = () => {
        history.push('/')
    }
    const MoveMain = () => {
        history.push('/main')
    }
    const MoveChat = () => {
        history.push('/chat')
    }
    const MoveMakeMeet = () => {
        history.push('/makemeet')
    }
    const MoveEditInfo = () => {
        history.push('/editinfo')
    }
    const MoveSignUp = () => {
        history.push('/signup')
    }
    const MoveLogin = () => {
        history.push('/login')
    }
    return (
        <div>
            <div className='navigation__bar'>
               <div className='navigation__logo' onClick={MoveAbout}></div>
                <div className='navigation__menu__list'>
                    <span className='navigation__menu' onClick={MoveMain}>
                        맞밥 약속 조회하기
                    </span>
                    <span className='navigation__menu' onClick={MoveChat}>
                     나의 맞밥 약속 보기
                    </span>
                    <span className='navigation__menu' onClick={MoveMakeMeet}>
                     맞밥 약속 만들기
                    </span>
                </div>
                <div className='navigation__bar__buttons'>
                    {isLogin ? <button className='navigation__button' onClick={MoveEditInfo}>마이페이지</button> :
                    <button className='navigation__button' onClick={MoveSignUp}>회원가입</button>}
                    {isLogin ? <button className='navigation__button' onClick={logoutHandler}>로그아웃</button> :
                    <button className='navigation__button' onClick={MoveLogin}>로그인</button>}
                </div>
            
            </div>
        </div>
    )
}

export default Nav
