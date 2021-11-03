import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import FoodPreferenceList from './FoodPreferenceList';
import './FoodPreference.css';
import { useSelector, useDispatch } from 'react-redux';

function FoodPreference({ userInfo }) {
  const history = useHistory();
  const [foodList, setFoodList] = useState([]);
  const dispatch = useDispatch();
  // const initial = useSelector(state => state.userReducer);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await axios
      .get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/taste`)
      .then((res) => {
        const data = res.data;
        const list = data.map((el) => ({
          ...el,
          selected: false,
        }));
        setFoodList(list);
      });
  }, []);

  const selectTaste = (id) => {
    const newList = foodList.map((food) => {
      if (food.taste_id === id) {
        return {
          ...food,
          selected: !food.selected,
        };
      } else {
        return food;
      }
    });
    setFoodList(newList);
  };

  const selectDoneGoToManner = async () => {
    const pickedList = foodList.filter((food) => food.selected);
    const myFoodList = pickedList.map((food) => food.taste_id);
    console.log(myFoodList);

    if (foodList.length !== 0) {
      await axios
        .patch(
          `http://localhost:${process.env.REACT_APP_SERVER_PORT}/userinfo/taste`,
          {
            taste_id: myFoodList,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          // setState 리듀서
          history.push('/usermanner'); // 식사예절 페이지로 이동
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='foodPreference'>
      <div className='preference__container'>
        <div className='preference__title'>음식 취향을 선택해주세요</div>
        <div className='preference__list__container'>
          <FoodPreferenceList foodList={foodList} selectTaste={selectTaste} />
        </div>
        <div className='preference__button__container'>
          {foodList.every((food) => !food.selected) ? (
            <button className='disabled' disabled>
              완료
            </button>
          ) : (
            <button
              className='preference__next'
              onClick={() => selectDoneGoToManner()}
            >
              완료
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodPreference;
