import React from 'react';
import { useState } from 'react';
import SignIn from '../Component/SignIn';
import './LoginModal.css';

function LogInModal({SetLoginModal}) {
    const [isSiginInModal, setSiginInModal] = useState(false);

    const closeHandler = () => {
        SetLoginModal(false)
    }

    return (
        <div>
            <div className='Loginmodal__background' onClick={closeHandler}></div>
            <div className='modalbackdrop loginModal'>
                    <SignIn isSiginInModal={isSiginInModal} className='component__signin'/>
                    </div>
                    
        </div>
    )
}

export default LogInModal
