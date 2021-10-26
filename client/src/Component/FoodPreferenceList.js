import React from 'react';
import './FoodPreferenceList.css';

function FoodPrefereceList({ foodList, selectTaste }) {
    // console.log(foodList.map(food => food.selected))

    return (
        <div className='foodPreferenceList'>
            {foodList?.map(food => food.selected === true  ?
                <div className='preference__food selected' onClick={() => selectTaste(food.taste_id)} >{food.name}</div>
                :
                <div className='preference__food' onClick={() => selectTaste(food.taste_id)} >{food.name}</div>
                )}
        </div>
    )
}

export default FoodPrefereceList
