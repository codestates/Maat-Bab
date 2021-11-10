import React, { useEffect } from 'react';
import './SuccessModal.css';
function SuccessModal() {

    const pathLogin = () => {
        document.location.href = '/login'
    }
    useEffect(() => {
        window.setTimeout(pathLogin,5000)
    },[])

    return (
        <div className='successmodal__background'>
            <div className='modalbackdrop success'>
                <div className='modalview success'>
                    <div className='modalview__massage success'>이메일 인증이 완료되었습니다</div>
                    <div className='modalview__count__message success'>5초후에 자동으로
                        로그인 화면으로 이동합니다</div>
                    <button className='modalview__button success'
                        onClick={pathLogin}
                    >로그인</button>
                </div>
            </div>
        </div>
    )
}

export default SuccessModal
