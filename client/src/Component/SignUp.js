import React, { useState } from 'react';
import './SignUp.css';
import FailModal from '../Modal/FailModal';
import SuccessModal from '../Modal/SuccessModal';


function SignUp() {

    const [passWord, setPassWord] = useState('')
    const [ChPassWord, setChPassWord] = useState('')
    const [modal,setModal] = useState('')

    const onChange1 = (e) =>{
        setPassWord(e.target.value)
    }
    const onChange2 = (e) => {
        setChPassWord(e.target.value)
    }


    return (
        <div className='signup__background'>
            {modal === 'fail' ? <FailModal setModal={setModal} /> : modal === 'success' ? <SuccessModal/ > : null}
            <div className='signup__content__container'>
               <h2 className='signup__title'>회원가입</h2>
                <div className='signup__container'>
                   <div className='signup__container__row email'>
                      <div className='signup__item'>E-Mail</div>
                      <input type='email' className='signup__email' placeholder='이메일'></input>
                     <div className='signup__errormessage'>※ 인증메일이 발송됩니다</div>
                 </div>
                    <div className='signup__container__row password'>
                        <div className='signup__item'>PassWord</div>
                        <input type='password' onKeyUp={(e) => onChange1(e)} className='signup__password' placeholder='비밀번호'></input>
                    </div>
                 <div className='signup__container__row passwordcheck'>
                        <div className='signup__item'>PassWord Check</div>
                        <input type='password' onKeyUp={(e) => onChange2(e)} className='signup__passwordcheck' placeholder='비밀번호 확인'></input>
                        <div className={passWord !== ChPassWord ? 'signup__errormessage' : 'signup__errormessage hide'}>※ 비밀번호가 일치하지 않습니다</div>
                    </div>
                   <div className='signup__container__row username'>
                        <div className='signup__item'>User Name</div>
                        <input type='text' className='signup__username' placeholder='사용자 이름'></input>
                    </div>
                </div>
                <div className='signup__button__container'>
                    <button className='signup__button'>회원 가입</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp
