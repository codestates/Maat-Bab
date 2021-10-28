import React, { useState } from 'react'
import './Nav.css';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import { setLoginStatus, setUserInfo } from '../actions';

function Nav({logoutHandler}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const initial = useSelector(state => state.userReducer);

    const [toggle, setToggle] = useState(false)

    const MoveAbout = () => {
        history.push('/')
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
                <FontAwesomeIcon icon={faHamburger}/>
                    </a>
            </nav>
        </div>
    )
}

export default Nav