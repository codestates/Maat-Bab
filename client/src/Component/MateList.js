import React from 'react';
import ProfileList from './ProfileList';
import './MateList.css';

function MateList({ my_user_id, selectedCard }) {
    return (
        <div className='matelist'>
            <div className='matelist__header'>
                <div className='matelist__header__title'>맞밥 메이트 보기 🙋‍♀️</div>
                <div className='matelist__header__text'>카드를 클릭하여 맞밥 약속에 참여해보세요!</div>
            </div>
            <section className='profile__section'> 
            <ProfileList />
            </section>

        </div>
    )
}

export default MateList
