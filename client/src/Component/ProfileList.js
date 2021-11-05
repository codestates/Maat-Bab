import React from 'react';
import './ProfileList.css';
import Profile from './Profile';

// * profile이 받는 Props == profile에 넘겨줄 것 taste, etiquette

function ProfileList({ mateList }) {
    console.log('mateList in ProfileList component ', mateList)

    return (
        <div className='profilelist'>
            {mateList ? mateList.map((mate) => {
                return <Profile className='profile__section' mate={mate}/>
            })
                :
        
                <div className='loader__box__ifnull'> 참여 중인 약속 카드를 클릭해 보세요!</div>
            }
        
        </div>
    )
}

export default ProfileList
