import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import FoodPreferenceList from './FoodPreferenceList';
import './FoodPreference.css';

function FoodPreference({ userInfo }) {
    const history = useHistory();
    const [foodList, setFoodList] = useState([]);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        await axios.get('http://localhost:4000/taste')
        .then(res => {
            const data = res.data;
            const list = data.map(el => ({
                ...el,
                selected: false
            }))
            setFoodList(list);
        })
    }, [])

    const selectTaste = (id) => {
        const newList = foodList.map(food => {
            if (food.taste_id === id) {
                return {
                    ...food,
                    selected: !food.selected,
                };
            } else {
                return food;
            }
        })
        setFoodList(newList)
    }

    // const user_id = 1; //dummy data
    const { user_id } = userInfo;
    const selectDoneGoToManner = async () => {
        const myFoodList = foodList.map(food => food.taste_id)
        if (foodList.length !== 0) {
            await axios.patch(`http://localhost:4000/userinfo/taste/${user_id}`, {
                'taste_id': [...myFoodList]
            })
            .then(res => {
                console.log(res.data);
            })
            history.push('/usermanner'); // 식사예절 페이지로 이동
        }
    }

    return (
        <div className='foodPreference'>
            <div className='preference__container'>
                <div className='preference__title'>음식 취향을 선택해주세요
                </div>
                <div className='preference__list__container'>
                    <FoodPreferenceList foodList={foodList} selectTaste={selectTaste} />
                </div>
                <div className='preference__button__container'>
                    {foodList.every(food => !food.selected) ?
                        <button className='disabled' disabled>완료</button>
                        :
                        <button className='preference__next' onClick={() => selectDoneGoToManner()}>완료</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default FoodPreference
