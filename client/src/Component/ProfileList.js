import React from 'react';
import './ProfileList.css';
import Profile from './Profile';

function ProfileList() {
    return (
        <div className='profilelist'>
                {/* map 돌리기 */}
            <Profile className='profile__section' />
            <Profile className='profile__section' />
        </div>
    )
}

export default ProfileList
