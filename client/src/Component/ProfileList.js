import React from 'react';
import './ProfileList.css';
import Profile from './Profile';

function ProfileList({ selectedCard, mateList }) {
    
    let nullText = '';
    if (!selectedCard) {
        nullText = '참여 중인 약속 카드를 클릭해 보세요!'
    } else if (selectedCard) {
        nullText = '아직 약속에 참여한 사람이 없습니다 😂'
    }

    return (
        <div className='profilelist'>
            {mateList ? mateList?.map((mate) => {
                return <Profile className='profile__section' mate={mate} />
            }
            )
                :
                <div className='loader__box__ifnull'> {nullText}</div>
            }
        </div>
    )
}

export default ProfileList
