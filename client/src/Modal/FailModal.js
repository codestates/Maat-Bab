import React from 'react';
import './FailModal.css'


function FailModal({setModal}) {

    const closeHandler = () => {
        setModal('')
    }


    return (
        <div className='failmodal__background' onClick={closeHandler}>
            <div className='modalbackdrop'>
                <div className='modalview'>
                    <div className='modalview__massage'>회원가입에 실패하였습니다</div>
                    <div className='modalview__count__message'>이미 가입된 메일인지 확인해 주세요</div>
                    <button className='modalview__button' onClick={closeHandler}>확인</button>
                </div>
            </div>
        </div>
    )
}

export default FailModal
