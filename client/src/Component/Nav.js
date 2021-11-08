import React, { useState } from 'react'
import './Nav.css';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';

function Nav({logoutHandler}) {
    const history = useHistory();
    const initial = useSelector(state => state.userReducer);

    const [toggle, setToggle] = useState(false)

    const MoveAbout = () => {
        document.location.href = '/'
    }
    const MoveEditInfo = () => {
        document.location.href = '/editinfo'
    }
    const MoveSignUp = () => {
        document.location.href = '/signup'
    }
    const MoveLogin = () => {
        document.location.href = '/login'
    }
    const toggleHandler = () => {
        setToggle(!toggle)
    }
    return (
        <div>
            <nav className='navigation__bar'>
                <div className='navigation__logo' onClick={MoveAbout}>

                </div>
                <ul className={toggle ? 'navigation__menu__list action' : 'navigation__menu__list'}>
                    <li className='navigation__menu'>
                        <a href='/main'>맞밥 약속 조회하기</a>
                        
                    </li>
                    <li className='navigation__menu'>
                        <a href='/chat'>나의 맞밥 약속보기</a>
                    </li>
                    <li className='navigation__menu'>
                        <a href='/makemeet'>맞밥 약속 만들기</a>
                    </li>
                </ul>
                <ul className={toggle ? 'navigation__bar__buttons action' : 'navigation__bar__buttons'}>
                    {initial.isLogin ? <li><button className='navigation__button' onClick={MoveEditInfo}>마이페이지</button></li> :
                    <li><button className='navigation__button' onClick={MoveSignUp}>회원가입</button></li>}
                    {initial.isLogin ? <li><button className='navigation__button' onClick={logoutHandler}>로그아웃</button></li> :
                    <li><button className='navigation__button' onClick={MoveLogin}>로그인</button></li>}
                </ul>

                <a href='#' className='navigation__toggle' onClick={toggleHandler}>
                <FontAwesomeIcon icon={faHamburger} className='navigation__toggle__hamburger'/>
                    </a>
            </nav>
        </div>
    )
}

export default Nav