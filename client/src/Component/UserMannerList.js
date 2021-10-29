import React, { useState, useEffect } from 'react';
import './UserMannerList.css';
import { FaPlusCircle } from "react-icons/fa";

function UserMannerList({ mannerList, selectHandler, addHandler }) {
    console.log(mannerList.filter(manner => manner.selected));

    const [placeholderText, setPlaceholderText] = useState('추가할 식사 예절을 입력해 주세요');
    const [customText, setCustomText] = useState(null)
    // input value 가져오기 
    const inputHandler = (e) => {
        setCustomText(e.target.value)
    }

    useEffect(() => {

        setPlaceholderText('추가할 식사 예절을 입력해 주세요')
    }, [mannerList])

    return (
            <div className='userMannerList'>
                <ul className='userMannerList'>
                {mannerList?.map((manner, index) => manner.selected === true  ?
                    <li key={index} className='manner selected' onClick={() => selectHandler(manner.manner_id, manner.text)} >{manner.text}</li>
                    :
                    <li key={index} className='manner' onClick={() => selectHandler(manner.manner_id, manner.text)} >{manner.text}</li>
                )}
                <li key='input' className='manner__input'>
                    <FaPlusCircle className='manner__custom__button' onClick={() => addHandler(mannerList.length, customText)}/>
                    <input className='manner__custom__input' type='text' placeholder={placeholderText} onChange={inputHandler} value={customText}></input>
                </li>
            </ul>
        </div>
    )
}

export default UserMannerList
