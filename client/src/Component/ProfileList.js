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
        
                <div className='loader__box__ifnull'> 맞밥 약속을 조회해 보세요!</div>
            }
        
        </div>
    )
}

export default ProfileList
