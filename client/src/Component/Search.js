import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';
// import KakaoMap from './KakaoMap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";

function Search({ searchCardHandler, searchingRegion, searchingDate}) {

    return (
        <div className='search'>
        <h3>Search Component</h3>

            <section className='searchbar'>
                <span className='searchbar__region__date'>
                
                    <span className='searchbar__region'>
                        <span className='searchbar__title'>맞밥 지역</span>
                        <input type='text'></input>
                        <button ><FaSearch className='search__icon' /></button>
                    </span>

                    <span className='searchbar__date'>    
                        <span className='searchbar__title'>맞밥 날짜</span>
                        <DatePicker className='searchbar__datepicker'/>
                    </span>
                    

                </span>
                <span className='searchbar__button__container'>
                    <button className='search__card__button' onClick={() => searchCardHandler(searchingRegion, searchingDate)}>조회하기</button>
                    <button className='make__card__button'>약속 만들기</button>
                </span>

        </section>
            <section className='searchmap'>
                
        </section>

        </div>
    )
}

export default Search
