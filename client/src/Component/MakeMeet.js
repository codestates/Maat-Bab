import React, { useState } from 'react';
import MapSearchModal from '../Modal/MapSearchModal';
import './MakeMeet.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function MakeMeet() {
    const region = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'];
    const [startDate, setStartDate] = useState(new Date());
    const [isFind, setIsFind] = useState(false);
    const [time, setTime] = useState('')
    const [city, setCity] = useState('')
    const [city2, setCity2] = useState('')
    const [countPeople,setCounPeople] = useState('0')
    const [curPlace, setCurnPlace] = useState('찾기 버튼을 눌러주세요')
    const [roomName, setRoomName] = useState('')

    const changeFind = () => {
        if(city !== '' && city2 !== ''){
            setIsFind(!isFind)
        }else{
            alert('지역을 선택해주세요')
        }
    }
    const changecount = (event) => {
        setCounPeople(event.target.value)
    }
    const changeTime = (value) => {
        setTime(value)
    }
    const changecity = (event) => {
        setCity(event.target.value)
    }
    const changeregion = (event) => {
        setCity2(event.target.value)
    }
    const changeroomname = (event) => {
        setRoomName(event.target.value)
    }
    const makeMeetCard = () => {
        if(curPlace !== '' && roomName !== ''){
            axios.post(`http://localhost:80/card`,{
            region:city2,
            date:startDate,
            time:time,
            headcount:countPeople,
            restaurant_name:curPlace,
            chat_title:roomName
        })
        }else if(curPlace !== '' && roomName === ''){
            axios.post(`http://localhost:80/card`,{
            region:city2,
            date:startDate,
            time:time,
            headcount:countPeople,
            restaurant_name:curPlace,
            chat_title:curPlace
        })
        }else if(curPlace === '' && roomName !== ''){
            axios.post(`http://localhost:80/card`,{
            region:city2,
            date:startDate,
            time:time,
            headcount:countPeople,
            chat_title:roomName
        })
        }
        return console.log(curPlace)
    }
    return (
        <div className='make__background'>
            {isFind ? <MapSearchModal changeFind={changeFind} city={city} city2={city2} setCurnPlace={setCurnPlace} /> : null}
            <div className='make__content__container'>
                <h1 className='make__card__title'>맞밥 약속 만들기</h1>
                <div className='make__card__info'>
                    <div className='make__card__info__row'>
                        <span className='make__card__info__item'>맞밥 지역</span>
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
                    </div>
                    <div className='make__card__info__row__date'>
                        <span className='make__card__info__item__date'>맞밥 날짜</span>
                        <span className='change'><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} popperPlacement="bottom" minDate={new Date()}/></span>
                    </div>
                    <div className='make__card__info__row'>
                        <span className='make__card__info__item'>맞밥 시간</span>
                            <button onClick={() => changeTime('아침')} className={time === '아침' ? 'make__card__info__time on' : 'make__card__info__time'}>아침</button>
                            <button onClick={() => changeTime('점심')} className={time === '점심' ? 'make__card__info__time on' : 'make__card__info__time'}>점심</button>
                            <button onClick={() => changeTime('저녁')} className={time === '저녁' ? 'make__card__info__time on' : 'make__card__info__time'}>저녁</button>
                    </div>
                    <div className='make__card__info__row'>
                        <span className='make__card__info__item'>모집 인원</span>
                        <select onChange={(e) => changecount(e)} name='people' className='make__card__info__headcount'>
                            <option value=''>인원 수</option>
                            <option value='2'>2명</option>
                        </select>
                    </div>
                    <div className='make__card__info__row'>
                        <span className='make__card__info__item'>모집 장소</span>
                        <input type='text' className='make__card__search__input' disabled='disabled' value={curPlace}></input>
                        <button onClick={changeFind} className='make__card__search__place'><FontAwesomeIcon icon={faMapMarker}/>찾기</button>
                    </div>
                    <div className='make__card__info__row'>
                        <span className='make__card__info__item'>방 제목</span>
                        <input onChange={(e) => changeroomname(e)} type='text' className='make__card__room__name' placeholder='미입력시 모집장소가 방제목이 됩니다'></input>
                    </div>

                </div>
                <button onClick={makeMeetCard} className='make__card__button'>만들기</button>
            </div>
        </div>
    )
}

export default MakeMeet;
