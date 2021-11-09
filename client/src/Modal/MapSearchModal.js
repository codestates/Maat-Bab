import React, { useState } from 'react';
import './MapSearchModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import Kakao from '../Component/ModalKakao'


function MapSearchModal({changeFind, city, city2, setCurnPlace}) {

    const [searchValue, setSearchValue] =useState('')
    const [searchPlace, setSearchPlace] = useState('')

    const changeValue = (event) =>{
        setSearchValue(event.target.value)
    }
    const changeplace = () => {
        setSearchPlace(searchValue)
    }
    
    return (
        <div className='mapsearch__background'>
            <div className='modal__search__content__container'>
                <div className='modal__search__place__title'>맞밥 지역 검색</div>
                <div className='modal__search__region__conatiner'>
                    <span className='main__select__region__name'>장소 검색</span>
                    <span className='main__select__region__second__row'>
                    <input placeholder='검색어를 입력하세요' onChange={(e) => changeValue(e)} className='main__select__region__input' type='text'></input>
                    <button onClick={changeplace} className='main__select__region__search'><FontAwesomeIcon className= 'search__icon' width='24' height='24' viewBox= "0 125 125 125" color='orange' icon={faSearchLocation} /></button>
                    </span>
                </div>
                <div className='modal__map__container'>
                    <Kakao city={city} city2={city2} searchPlace={searchPlace} setCurnPlace={setCurnPlace}/>
                </div>
                <button onClick={changeFind} className='modal__close'>확인</button>
            </div>
        </div>
    )
}

export default MapSearchModal
