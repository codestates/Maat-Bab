import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodPreferenceList from './FoodPreferenceList';
import './FoodPreference.css';

function FoodPreference() {
    // ? user_id 가져오기 (get /auth)

    // const [myFoodList, setMyFoodList] = useState([]);
    const [myFoodList, setMyFoodList] = useState([{ 'taste_id': 9, 'name': '스시' }, { 'taste_id': 8, 'name': '마라탕' }, { 'taste_id': 16, 'name': '피자' }]);

    // ? 음식취향 전체 리스트 조회
    // const foodList = axios.get('http://localhost:4000/taste')
    //     .then(data => {

    //     })
    
    const foodList = [
        { 'taste_id': 1, 'name': '한식' }, { 'taste_id': 2, 'name': '일식' }, { 'taste_id': 3, 'name': '양식' }, { 'taste_id': 4, 'name': '분식' }, { 'taste_id': 5, 'name': '중식' },
        { 'taste_id': 6, 'name': '치킨'}, { 'taste_id': 7, 'name': '디저트'}, { 'taste_id': 8, 'name': '마라탕'}, { 'taste_id': 9, 'name': '스시'}, { 'taste_id': 10, 'name': '찜 ・ 탕'},
        { 'taste_id': 11, 'name': '패스트푸드'}, { 'taste_id': 12, 'name': '참치회'}, { 'taste_id': 13, 'name': '돼지고기'}, { 'taste_id': 14, 'name': '편의점'}, { 'taste_id': 15, 'name': '족발・보쌈'},
        {'taste_id': 16, 'name': '피자'}, {'taste_id': 17, 'name': '스테이크'}, {'taste_id': 18, 'name': '비건'}, {'taste_id': 19, 'name': '샐러드'}, {'taste_id': 20, 'name': '양꼬치'}
    ]

    // useEffect(() => {

    // }, [myFoodList])
    
    const selectTaste = (food) => {
        setMyFoodList([...myFoodList, food])
    }

    return (
        <div className='foodPreference'>
            <div className='preference__container'>
                <div className='preference__title'>음식 취향을 선택해주세요
                </div>
                <div className='preference__list__container'>
                    <FoodPreferenceList foodList={foodList} myFoodList={myFoodList} selectfunc={selectTaste} />
                </div>
                <div className='preference__button__container'>
                    {myFoodList.length !== 0 ?
                        <button className='preference__next'>완료</button>
                        :
                        <button className='preference__next' disabled>완료</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default FoodPreference
