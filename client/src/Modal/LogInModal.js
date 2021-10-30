import React from 'react';
import { useState } from 'react';
import SignIn from '../Component/SignIn';
import './LoginModal.css';

function LogInModal() {
    const [isSiginInModal, setSiginInModal] = useState(true);

    const closeHandler = () => {
        // setModal('')
    }

    return (
        <div>
            <div className='Loginmodal__background' onClick={closeHandler}>
            <div className='modalbackdrop loginModal'>
                    <SignIn isSiginInModal={isSiginInModal} />
                    </div>
                    </div>
        </div>
    )
}

export default LogInModal
