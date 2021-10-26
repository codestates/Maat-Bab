import React, { useState, useEffect } from 'react';
import './UserMannerList.css';
import { FaPlusCircle } from "react-icons/fa";

function UserMannerList({ mannerList, selectManner }) {
    console.log(mannerList.filter(manner => manner.selected));

    const [addedText, setaddedText] = useState(null);
    const [addedIndex, setaddedIndex] = useState(mannerList.length);

    const addManner =  (e) => {
        if (e.target.value !== null && e.target.value !== '') {
            console.log(addedText);
            setaddedText(e.target.value);
            console.log(addedText);
        }
    };

    useEffect(() => {
        setaddedText(null);
        setaddedIndex(mannerList.length);
    }, [mannerList])

    return (
            <div className='userMannerList'>
                <ul className='userMannerList'>
                {mannerList?.map((manner, index) => manner.selected === true  ?
                    <li key={index} className='manner selected' onClick={() => selectManner(manner.manner_id, manner.text)} >{manner.text}</li>
                    :
                    <li key={index} className='manner' onClick={() => selectManner(manner.manner_id, manner.text)} >{manner.text}</li>
                )}
                <li key='input' className='manner__input'>
                    <FaPlusCircle className='manner__add__button' onClick={() => selectManner(addedIndex, addedText)}/>
                    <input type='text' placeholder='추가할 식사 예절을 입력해 주세요' onChange={addManner} value={addedText}></input>
                </li>
            </ul>
        </div>
    )
}

export default UserMannerList
