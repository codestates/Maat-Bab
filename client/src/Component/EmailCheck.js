import React from 'react';
import './EmailCheck.css';


function EmailCheck() {
    return (
        <div className='emailcheck__background'>
            <div className='emailcheck__content__container'>
                <h2 className='emailcheck__title'>이메일 인증</h2>
                <ul className='emailcheck__messages__cocntainer'>
                    <li className='emailcheck__messages__cocntainer__message1'>회원님은 임시 가입 상태입니다</li>
                    <li className='emailcheck__messages__cocntainer__message2'>가입하신  이메일로 인증 메일이 발송되었습니다.<br />
                    메일을 확인해주세요 :)</li>
                </ul>
                <div className='emailcheck__button__container'>
                    <span className='emailcheck__button__name'>E-Mail</span><span className='emailcheck__button__message'>※ 이메일을 받지 못하셨나요?</span>
                    <div className='emailcheck__button__email__input__div'><input type='email' className='emailcheck__button__email__input' value='example@example.com'></input></div>
                    <button className='emailcheck__button__send__button'>인증메일 다시 보내기</button>
                </div>
            </div>
        </div>
    )
}

export default EmailCheck
