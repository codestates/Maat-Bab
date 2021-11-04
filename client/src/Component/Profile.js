import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <div className='profile'>
      <section className='profile__container'>
        <section className='profile__first__container'>
          <span className='profile__photo'> 👤</span>
          <span className='profile__username'>김코딩</span>
        </section>
        <section className='profile__second__container'>
          <div className='profile__title'>음식 취향</div>
          
          <div className='profile__taste__list'>
            {/* map 돌리기 */}
            <span className='profile__taste'>태국음식</span>
            <span className='profile__taste'>할랄푸드</span>
          </div>

        </section>
        <section className='profile__third__container'>
          <div className='profile__title'>테이블 매너</div>

          <div className='profile__tablemanner__list'>
            {/* map 돌리기 */}
            <span className='profile__tablemanner'> 청결함은 기본! 식사 전 손을 씻어 주세요 🧼</span>
          </div>
        </section>

      </section>
    </div>
  )
}

export default Profile
