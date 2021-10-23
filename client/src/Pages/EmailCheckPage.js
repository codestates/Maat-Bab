import React from 'react'
import EmailCheck from '../Component/EmailCheck'
import SuccessModal from '../Modal/SuccessModal'
import FailModal from '../Modal/FailModal'

function EmailCheckPage() {
    return (
        <div className='emailcheckpage'>
            
            <EmailCheck />

            {/* //이메일인증 성공하면 -> <SuccessModal /> */}
            {/* //이메일인증 실패하면 -> <FailModal /> */}
        </div>
    )
}

export default EmailCheckPage
