import React, { useState } from 'react';
import './UserMannerList.css';
import { FaPlusCircle } from "react-icons/fa";

function UserMannerList({ mannerList, selectManner }) {
    console.log(mannerList.filter(manner => manner.selected));

    const [addedText, setaddedText] = useState(null);
    const [addedIndex, setaddedIndex] = useState(mannerList.length);

    const addManner =  (e) => {
        if (e.target.value) {
            console.log(addedText);
             setaddedText(e.target.value);
            console.log(addedText);
        }
    };

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
            {/* input 1줄 +버튼 position: absolute (w. parent relative) : + 버튼 클릭 시 div화 되고 selected 되어야 함, => 그리고 input 한 줄 더 .. or 여기서부터는 + 버튼만 렌더
                or + 버튼 => 클릭시 input open  : */}
        </div>
    )
}

export default UserMannerList
