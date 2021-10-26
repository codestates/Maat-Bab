import React from 'react'
import './UserMannerList.css';

function UserMannerList({ mannerList, selectManner }) {
    console.log(mannerList.filter(manner => manner.selected));

    return (
            <div className='userMannerList'>
                <ul className='userMannerList'>
                {mannerList?.map(manner => manner.selected === true  ?
                    <li className='manner selected' onClick={() => selectManner(manner.manner_id)} >{manner.text}</li>
                    :
                    <li className='manner' onClick={() => selectManner(manner.manner_id)} >{manner.text}</li>
                    )}
            </ul>
            {/* input 1줄 +버튼 position: absolute (w. parent relative) : + 버튼 클릭 시 div화 되고 selected 되어야 함, => 그리고 input 한 줄 더 .. or 여기서부터는 + 버튼만 렌더
                or + 버튼 => 클릭시 input open  : */}
        </div>
    )
}

export default UserMannerList
