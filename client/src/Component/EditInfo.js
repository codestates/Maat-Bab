import React, { useState } from 'react';
import './EditInfo.css'
import { useSelector, useDispatch } from 'react-redux';


function EditInfo() {
    const initial = useSelector(state => state.userReducer);
    const [passWord, setPassWord] = useState('')
    const [passWordCheck, setPassWordCheck] =useState('')

    const onchangePwd = (e) => {
        setPassWord(e.target.value)
    }
    const onchangePwdCk = (e) => {
        setPassWordCheck(e.target.value)
    }
        return (
        <div className='edit__background'>
            <div className='edit__content'>
                <h1 className='edit__title'>회원정보 수정</h1>
                <div className='edit__title__user'>회원 정보</div>
                <div className='edit__user__box'>
                    <span className='edit__user__input__name'>E-mail</span>
                    <input className='edit__user__input' disabled='disabled' type='email' value={initial.userInfo.email}></input><br />
                    <span className='edit__user__input__name'>비밀번호</span>
                    <input placeholder='비밀번호' onChange={(e) => onchangePwd(e)} className='edit__password__input' type='password'></input><br />
                    <span className='edit__user__input__name'>비밀번호 확인</span>
                    <input placeholder='비밀번호 확인' onChange={(e) => onchangePwdCk(e)} className='edit__password__check__input' type='password'></input>
                    <div className={passWord === passWordCheck ? 'edit__user__err hide' : 'edit__user__err'} >비밀번호가 일치하지 않습니다.</div><br />
                    <span className='edit__user__input__name'>UserName</span>
                    <input type='text' placeholder='이름' className='edit__username__input'></input>
                </div>

            </div>
            
            
        </div>
    )
}

export default EditInfo
