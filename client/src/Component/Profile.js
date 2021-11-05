import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile({ mate }) {
  console.log('mate: ', mate);

  // useEffect(() => {
  //   mate 의 taste 가져오기
  // }, [])

  const [etiquette, setEtiquette] = useState([`추가한 테이블 매너가 없습니다 😂`]);

  useEffect(() => {
    let arrangedUserEtiquette = mate.etiquette.slice(2, mate.etiquette.length - 2);
    arrangedUserEtiquette = arrangedUserEtiquette.split('","');
  
    console.log(arrangedUserEtiquette);
  
    setEtiquette(arrangedUserEtiquette);
  }, [])

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
            {/* map 돌리기 */}
            <span className='profile__taste'>태국음식</span>
          </div>

        </section>
        <section className='profile__third__container'>
          <div className='profile__title'>테이블 매너</div>

          <div className='profile__tablemanner__list'>
            {/* map 돌리기 */}
            {etiquette ? etiquette.map(manner => <span className='profile__tablemanner'>{manner}</span>)
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
