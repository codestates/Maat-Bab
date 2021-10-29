import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';
// import KakaoMap from './KakaoMap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import Kakao from '../Component/KakaoMap'

function Search({ searchCardHandler }) {

    const [searchingRegion, setRegion] = useState('용산구')
    const [searchingDate, setDate] = useState(new Date())

    const [startDate, setStartDate] = useState(new Date());
    
    const region = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'];

    const [isFind, setIsFind] = useState(false);
    const [city, setCity] = useState('')
    const [city2, setCity2] = useState('')
    const [curPlace, setCurnPlace] = useState('')

    const [searchValue, setSearchValue] =useState('')
    const [searchPlace, setSearchPlace] = useState('')

    const changeValue = (event) =>{
        setSearchValue(event.target.value)
    }
    const changeplace = () => {
        // setSearchPlace(searchValue)
        if (city !== '' && city2 !== '') {
            setIsFind(!isFind)
            setSearchPlace(searchValue)
        } else {
            alert('지역을 선택해주세요')
        }
    }

    const changecity = (event) => {
        setCity(event.target.value)
    }
    const changeregion = (event) => {
        setCity2(event.target.value)
        console.log(event.target.value)
        setRegion(event.target.value)
    }

    return (
        <div className='search'>
        <h3>Search Component</h3>

            <section className='searchbar'>
                <div className='searchbar__region__date'>
                
                    <span className='searchbar__region'>
                        <span className='searchbar__title'>맞밥 지역</span>
                        <span className='searchbar__region__first__container'>
                            <select onChange={(e) => changecity(e)} name='city1' className='make__card__info__region__city'>
                                <option value=''>지역선택</option>
                                <option value='서울특별시'>서울특별시</option>
                                </select>
                                <select onChange={(e) => changeregion(e)} name='city2' className='make__card__info__region__district'>
                                <option value=''>지역구</option>
                                {region.map((el, idx) => {
                                return <option key={idx} value={el}>{el}</option>
                            })}
                            </select>    
                        </span>

                        <span className='searchbar__region__second__container'>
                            <input type='text' onChange={(e) => changeValue(e)} value={curPlace} placeholder='지역을 선택하고 음식점을 검색해 보세요'></input>
                            <button onClick={changeplace}><FaSearch className='search__icon' /></button>
                        </span>
                    </span>

                    <span className='searchbar__date'>    
                        <span className='searchbar__title'>맞밥 날짜</span>
                        <span className='searchbar__datepicker__wrapper'><DatePicker className='searchbar__datepicker' selected={startDate} onChange={(date) => setStartDate(date)}popperPlacement="bottom" minDate={new Date()} /></span>
                    </span>             
                </div>

                <div className='searchbar__button__container'>
                    <button className='search__card__button' onClick={() => searchCardHandler(searchingRegion, searchingDate)}>조회하기</button>
                    <button className='search__make__button'>약속 만들기</button>
                </div>

        </section>
            <section className='searchmap'>
            {isFind? <Kakao city={city} city2={city2} searchPlace={searchPlace} setCurnPlace={setCurnPlace}/>
        : <Kakao city={'서울특별시'} city2={'용산구'} searchPlace={searchPlace} setCurnPlace={setCurnPlace}/>
        }
            </section>

        </div>
    )
}

export default Search
