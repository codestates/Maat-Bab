import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import UserMannerList from './UserMannerList';
import './UserManner.css';
import { MannerData } from '../resource/MannerData';

function UserManner() {
  const history = useHistory();
  const [mannerList, setMannerList] = useState(MannerData);

  useEffect(() => {
    setMannerList(mannerList);
  }, [mannerList]);

  function selectMannerHandler(id, text) {
    if (
      text !== null &&
      text !== '' &&
      text !== '추가할 식사 예절을 입력해 주세요' &&
      text.length > 1
    ) {
      if (
        mannerList.every(
          (manner) => manner.manner_id !== id && manner.text !== text
        )
      ) {
        mannerList.push({
          manner_id: mannerList.length,
          text: text,
          // selected: true
        });
      }
      const newList = mannerList.map((manner) => {
        if (manner.manner_id === id || manner.text === text) {
          return {
            ...manner,
            selected: !manner.selected,
          };
        } else {
          return manner;
        }
      });
      setMannerList(newList);
    }
  }

  const selectDoneRedirect = async () => {
    // 식사 예절 patch 요청
    const myMannerList = mannerList.map((manner) => manner.text);
    if (mannerList.length !== 0) {
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}/userinfo/etiquette`,
          {
            etiquette: [...myMannerList],
          }
        )
        .then((res) => {
          console.log(res.data);
        });
      history.push('/main'); // main 페이지로 이동
    }
  };

  return (
    <div className='usermanner'>
      <div className='tablemanner_container'>
        <div className='tablemanner_title'>
          지향하는 테이블 매너를 선택해 주세요
        </div>
        <div className='tablemanner__list__container'>
          <UserMannerList
            mannerList={mannerList}
            selectHandler={selectMannerHandler}
            addHandler={selectMannerHandler}
          />
        </div>
        <div className='tablemanner__button__container'>
          {mannerList.every((manner) => !manner.selected) ? (
            <button className='disabled' disabled>
              완료
            </button>
          ) : (
            <button
              className='tablemanner__done'
              onClick={() => selectDoneRedirect()}
            >
              완료
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserManner;
