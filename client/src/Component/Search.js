import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Search.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import KakaoMap from '../Component/KakaoMap';
import { regionData } from '../resource/regionData';
import { FaPlusCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';

function Search({ searchCardHandler, setCurnPlace, curnPlace, SetLoginModal }) {
    const history = useHistory();
    const initial = useSelector((state) => state.userReducer);

    const [searchingRegion, setRegion] = useState('')
    const [searchingDate, setSearchingDate] = useState(new Date());
    
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')

    const [placeInputValue, setPlaceInputValue] = useState('')
    const [searchingPlace, setSearchingPlace] = useState('')


    const placeInputHandler = (e) =>{
        setPlaceInputValue(e.target.value);
    }

    const changeplace = () => {
        if (city && city !== '' && district && district !== '') {
            setSearchingPlace(placeInputValue);
        } else {
            alert('지역을 선택해주세요')
        }
    }
    
    const changecity = (event) => {
        setCity(event.target.value)
    }
    const changeregion = (event) => {
        setDistrict(event.target.value)
        setRegion(event.target.value)
    }

    const makeCardHandler = () => {
        if (initial.isLogin) {
            history.push('/makemeet')
        } else {
            SetLoginModal(true)
        }
    }

    return (
        <div className='search'>
        <h3 className='search__component__title'> 맞밥 약속 조회하기 🍳</h3>

            <div className='searchbar'>
                <div className='searchbar__region__date'>
                
                    <span className='searchbar__region'>
                        <span className='searchbar__title region'>맞밥 지역</span>
                        <span className='searchbar__region__container'>
                            <span className='searchbar__region__first__container'>
                                <select onChange={(e) => changecity(e)} name='city1' className='search__select__region__city'>
                                    <option value=''>지역선택</option>
                                    <option value='서울특별시'>서울특별시</option>
                                    </select>
                                    <select onChange={(e) => changeregion(e)} name='district' className='search__select__region__district'>
                                    <option value=''>지역구</option>
                                    {regionData.map((el, idx) => {
                                    return <option key={idx} value={el}>{el}</option>
                                })}
                                </select>    
                            </span>

                            <span className='searchbar__region__second__container'>
                                <input className='searchbar__restaurant__search' type='text' onChange={ placeInputHandler} value={placeInputValue} placeholder='음식점을 검색해 보세요'></input>
                                <FaSearch className='search__icon' size='20' color='orange' onClick={changeplace}/>
                            </span>
                        </span>
                    </span>

                    <span className='searchbar__date'>    
                        <span className='searchbar__title title__date'>맞밥 날짜</span>
                        <span className='searchbar__datepicker__wrapper'><DatePicker className='searchbar__datepicker' selected={searchingDate} onChange={(date) => setSearchingDate(date)} popperPlacement="bottom" minDate={new Date()} /></span>
                    </span>             
                </div>

                <div className='searchbar__button__container'>
                    <button className='search__card__button' onClick={() => searchCardHandler(searchingRegion, searchingDate, curnPlace)}>조회하기</button>
                    <button className='search__make__button' onClick={makeCardHandler}>약속 만들기<FaPlusCircle className='search__makemeet__icon'/></button>
                </div>

        </div>
            <div className='searchmap'>
                        <KakaoMap className='main__search__kakaomap' city={city} district={district} searchingPlace={searchingPlace} setCurnPlace={setCurnPlace} />
            </div>

        </div>
    )
}

export default Search
