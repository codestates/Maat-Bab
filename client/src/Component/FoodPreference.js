import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import FoodPreferenceList from './FoodPreferenceList';
import './FoodPreference.css';

function FoodPreference() {
    const history = useHistory();

    // ? user_id 가져오기 (get /auth)

    // const [myFoodList, setMyFoodList] = useState([]);
    const [myFoodList, setMyFoodList] = useState(['한식', '스시', '비건']);

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

    useEffect(() => {
        console.log(333, myFoodList);
        
    }, [myFoodList])
    
    const selectTaste = (food) => {
        console.log(111, myFoodList)
        if (!myFoodList.includes(food)) {
            setMyFoodList([...myFoodList, food])
            console.log(222, myFoodList)
        } else {
            myFoodList.pop();
            console.log('click again: --delete--')
        }
    }

    const selectDoneGoToManner = async () => {
        // ? 음식취향 patch 요청보내기
        await axios.patch('http://localhost:4000/userinfo/taste/:user_id', {
            'taste_id': [...myFoodList]
        })
            .then(data => {
                console.log(data);
            })

        // 식사예절 페이지로 이동
        history.push('/usermanner')
    }

    return (
        <div className='foodPreference'>
            <div className='preference__container'>
                <div className='preference__title'>음식 취향을 선택해주세요
                </div>
                <div className='preference__list__container'>
                    <FoodPreferenceList foodList={foodList} myFoodList={myFoodList} selectTaste={selectTaste} />
                </div>
                <div className='preference__button__container'>
                    {myFoodList.length !== 0 ?
                        <button className='preference__next' onClick={() => selectDoneGoToManner()}>완료</button>
                        :
                        <button className='preference__next' disabled>완료</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default FoodPreference
