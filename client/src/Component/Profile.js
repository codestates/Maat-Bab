import React from 'react';
import './Profile.css';

function Profile({ mate }) {

  return (
    <div className='profile'>
        <section className='profile__container'>
        <section className='profile__first__container'>
          <span className='profile__photo'> 👤</span>
          <span className='profile__username'>{mate.name}</span>
        </section>
        <section className='profile__second__container'>
          <div className='profile__title'>음식 취향</div>
          
          <div className='profile__taste__list'>
            {mate.Taste ? mate.Taste.map(taste => {
              return <span className='profile__taste'>{taste}</span> 
            })
              :
              <div className='loader__box__ifnull'> 추가한 음식 취향이 없습니다 😂</div>
          }
          
          </div>

        </section>
        <section className='profile__third__container'>
          <div className='profile__title'>테이블 매너</div>

          <div className='profile__tablemanner__list'>
            {mate.etiquette ? mate.etiquette.map(manner => <span className='profile__tablemanner'>{manner}</span>)
              :
              <div className='loader__box__ifnull'> 추가한 테이블 매너가 없습니다 😂</div>
            }
          </div>
        </section>

      </section>
    </div>
  )
}

export default Profile
