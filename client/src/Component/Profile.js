import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <div className='profile'>
      <section className='profile__container'>
        <section className='profile__first__container'>
          <span className='profile__photo'></span>
          <span className='profile__username'></span>
        </section>
        <section className='profile__second__container'>
          <div className='profile__title'>음식 취향</div>
          
          <div className='profile__taste'>
            {/* map 돌리기 */}
          </div>

        </section>
        <section className='profile__third__container'>
          <div className='profile__title'>식사 예절</div>

          <div className='profile__tablemanner__list'>
            {/* map 돌리기 */}
          </div>
        </section>

      </section>
    </div>
  )
}

export default Profile
