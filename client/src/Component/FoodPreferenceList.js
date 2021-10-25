import React from 'react';
import './FoodPreferenceList.css';

function FoodPrefereceList({ foodList, myFoodList, selectFunc }) {
    return (
        <div className='foodPreferenceList'>
            {foodList.map(food => myFoodList.includes(food)  ?
                <div className='preference__food selected' onClick={() => { selectFunc() }} >{food.name}</div>
                :
                <div className='preference__food' onClick={() => { selectFunc() }} >{food.name}</div>
            )}
        </div>
    )
}

export default FoodPrefereceList
