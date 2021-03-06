import React from 'react';
import './Profile.css';

function Profile({ mate }) {
  return (
    <div className='profile'>
        <section className='profile__container'>
        <section className='profile__first__container'>
          <span className='profile__photo'> π€</span>
          <span className='profile__username'>{mate.name}</span>
        </section>
        <section className='profile__second__container'>
          <div className='profile__title'>μμ μ·¨ν₯</div>
          
          <div className='profile__taste__list'>
            {mate.Tastes ? mate.Tastes.map(taste => {
              return <span className='profile__taste'>{taste.name}</span> 
            })
              :
              <div className='loader__box__ifnull'> μΆκ°ν μμ μ·¨ν₯μ΄ μμ΅λλ€ π</div>
          }
          
          </div>

        </section>
        <section className='profile__third__container'>
          <div className='profile__title'>νμ΄λΈ λ§€λ</div>

          <div className='profile__tablemanner__list'>
            {mate.etiquette ? mate.etiquette.map(manner => <span className='profile__tablemanner'>{manner}</span>)
              :
              <div className='loader__box__ifnull'> μΆκ°ν νμ΄λΈ λ§€λκ° μμ΅λλ€ π</div>
            }
          </div>
        </section>

      </section>
    </div>
  )
}

export default Profile
