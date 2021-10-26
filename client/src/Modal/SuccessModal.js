import React, { useState, useEffect } from 'react';
import './SuccessModal.css';
import {useHistory } from 'react-router-dom';

function SuccessModal() {
    const [count, setCount] = useState(5)
    const history = useHistory()

    const pathLogin = () => {
        history.push('/login')
    }
    useEffect(() => {
        window.setTimeout(pathLogin,5000)
    },[])

    return (
        <div className='successmodal__background'>
            <div className='modalbackdrop'>
                <div className='modalview'>
                    <div className='modalview__massage'>회원가입이 완료되었습니다</div>
                    <div className='modalview__count__massage'>{count}초 후에 자동으로 로그인 화면으로 이동합니다</div>
                    <button className='modalview__button' onClick={pathLogin}>로그인</button>
                </div>
            </div>
        </div>
    )
}

export default SuccessModal