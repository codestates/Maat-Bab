import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import UserMannerList from './UserMannerList'
import './UserManner.css';
import { MannerData } from '../resource/MannerData';

function UserManner({ userInfo }) {
    const history = useHistory();
    const [mannerList, setMannerList] = useState(MannerData);
    
    useEffect(() => {
        setMannerList(mannerList)
    }, [mannerList])

    const selectManner = (id, text) => {
        if (!mannerList[id]) {
            mannerList.push({
                manner_id: id,
                text: text,
            })
        }
        const newList = mannerList.map(manner => {
            if (manner.manner_id === id) {
                console.log(4444);
                return {
                    ...manner,
                    selected: !manner.selected,
                };
            } else {
                console.log(5555);
                return manner;
            }
        })
        setMannerList(newList);
    }

    const { user_id } = userInfo;
    // const user_id = 1; //dummy data;
    
    const selectDoneRedirect = async () => {
        // 식사 예절 patch 요청
        const myMannerList = mannerList.map(manner => manner.text)
        if (mannerList.length !== 0) {
            await axios.patch(`http://localhost:4000/userinfo/etiquette/${user_id}`, {
                'etiquette': [...myMannerList]
            })
            .then(res => {
                console.log(res.data);
            })
            history.push('/main'); // main 페이지로 이동
        }
    }

    return (
        <div className='usermanner'>
            <div className='tablemanner_container'>
            <div className='tablemanner_title'>
                지향하는 테이블 매너를 선택해 주세요
                </div>
                <div className='tablemanner__list__container'>
                    <UserMannerList mannerList={mannerList} selectManner={selectManner}/>
                </div>
                <div className='tablemanner__button__container'>
                {mannerList.every(manner => !manner.selected) ?
                        <button className='disabled' disabled>완료</button>
                        :
                        <button className='tablemanner__done' onClick={() => selectDoneRedirect()}>완료</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserManner
