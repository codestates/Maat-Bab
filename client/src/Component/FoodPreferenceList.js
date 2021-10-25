import React from 'react';
import './FoodPreferenceList.css';

function FoodPrefereceList({ foodList, myFoodList, selectTaste }) {
    return (
        <div className='foodPreferenceList'>
            {foodList.map((food, index) => myFoodList.includes(food.name)  ?
                <div className='preference__food selected' onClick={() => selectTaste(food.name)} >{food.name}</div>
                :
                <div className='preference__food' onClick={() => selectTaste(food.name)} >{food.name}</div>
            )}


            {/* {foodList.map(food => myFoodList.includes(food)  ?
                <div className='preference__food selected' onClick={() => selectTaste(food)} >{food.name}</div>
                :
                <div className='preference__food' onClick={() => selectTaste(food)} >{food.name}</div>
            )} */}
        </div>
    )
}

export default FoodPrefereceList
