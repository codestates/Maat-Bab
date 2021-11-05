import React, { useState, useEffect } from 'react';
import './EditInfo.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { MannerData } from '../resource/MannerData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function EditInfo() {
  const dispatch = useDispatch();
  const initial = useSelector((state) => state.userReducer);
  //리덕스 상태값
  const [passWord, setPassWord] = useState('');
  //비밀번호
  const [passWordCheck, setPassWordCheck] = useState('');
  //비밀번호확인
  const [nickName, setNickName] = useState('');
  //유저이름
  const [foodLists, setFoodLists] = useState([]);
  //음식 전체리스트
  const [sumLists, setSumLists] = useState([]);
  //음식 전체,선택 합친리스트
  const [manner, setManner] = useState(MannerData);
  //매너 전체리스트
  const [sumManner, setSumManner] = useState([]);
  //매너 전체,선택 합친리스트
  const [addManner, setAddManner] = useState('');
  //매너추가 입력창

  useEffect(() => {
    const newArr = manner.map((el) => ({
      ...el,
      selected: false,
    }));
    setManner(newArr);
    axios
      .get(`${process.env.REACT_APP_API_URL}/taste`)
      .then((res) => {
        const lists = res.data;
        const addList = lists.map((el) => ({
          ...el,
          selected: false,
        }));
        setFoodLists(addList);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/userinfo/taste`
      )
      .then((res) => {
        if(res.status === 204){
          setSumLists(foodLists)
        }else{
        const myData = res.data;
        const selectedList = foodLists.map((food) => {
          if (
            myData.some((myfood, index) => food.taste_id === myfood.taste_id)
          ) {
            return {
              ...food,
              selected: true,
            };
          } else if (
            myData.some((myfood, index) => food.taste_id !== myfood.taste_id)
          ) {
            return {
              ...food,
            };
          }
        });
        setSumLists(selectedList);
      }
      });
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/userinfo/etiquette`
      )
      .then((res) => {
        const myManner = res.data.etiquette;
        if(myManner === null){
          const arr = manner.map(el => {
            return {
              ...el,
              selected: false,
            }
          })
          setSumManner(arr)
        }else{
        const selectManner = manner.map((el) => {
          if (myManner.some((ele, idx) => el.text === ele)) {
            return {
              ...el,
              selected: true,
            };
          } else if (myManner.some((ele, idx) => el.text !== ele)) {
            return {
              ...el,
            };
          }
        });
        setSumManner(selectManner);
      }
      });
  }, [foodLists, manner]);

  const selectFoodHandler = (id) => {
    const changeList = sumLists.map((el) => {
      if (el.taste_id === id) {
        return {
          ...el,
          selected: !el.selected,
        };
      } else {
        return {
          ...el,
        };
      }
    });
    setSumLists(changeList);
  };
  const selectMannerHandler = (str) => {
    const changeManner = sumManner.map((el) => {
      if (el.text === str) {
        return {
          ...el,
          selected: !el.selected,
        };
      } else {
        return {
          ...el,
        };
      }
    });
    setSumManner(changeManner);
  };

  const infoCorrection = () => {
    if (nickName === '' || passWord === '' || passWordCheck === '') {
      return alert('정보를 모두 입력해주세요');
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/userinfo`,
          {
            name: nickName,
            password: passWord,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            alert('회원정보 수정이 완료되었습니다');
          } else {
            alert('잠시 후 다시 시도해주세요');
          }
        });
    }
  };
  const foodCorrection = () => {
    const filtered = sumLists.filter((el) => el.selected === true);
    const filterIdx = filtered.map((el) => el.taste_id);
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/userinfo/taste`,
        {
          taste_id: filterIdx,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert('수정이 완료되었습니다');
        } else {
          alert('잠시 후 다시 시도해주세요');
        }
      });
  };

  const mannerCorrection = () => {
    const filtered = sumManner.filter((el) => el.selected === true);
    const texts = filtered.map((el) => el.text);
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/userinfo/etiquette`,
        {
          etiquette: texts,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert('수정이 완료되었습니다');
        } else {
          alert('잠시 후 다시 시도해주세요');
        }
      });
  };

  const addMannerBtn = () => {
    setManner([
      ...manner,
      { manner_id: manner.length, text: addManner, selected: true },
    ]);
    document.querySelector('.edit__custom__manner__input').value = '';
  };
  const onchangePwd = (e) => {
    setPassWord(e.target.value);
  };
  const onchangePwdCk = (e) => {
    setPassWordCheck(e.target.value);
  };
  const onchangeName = (e) => {
    setNickName(e.target.value);
  };
  const onchangeAddManner = (e) => {
    setAddManner(e.target.value);
  };
  return (
    <div className='edit__background'>
      <div className='edit__content'>
        <h1 className='edit__title'>회원정보 수정</h1>
        <div className='edit__title__content'>회원 정보</div>
        <div className='edit__user__box'>
          <span className='edit__user__input__name'>E-mail</span>
          <input
            className='edit__user__input'
            disabled='disabled'
            type='email'
            value={initial.userInfo.email ? initial.userInfo.email : '소셜로그인상태입니다'}
          ></input>
          <br />
          <span className='edit__user__input__name'>비밀번호</span>
          <input
            placeholder='비밀번호'
            onChange={(e) => onchangePwd(e)}
            className='edit__password__input'
            type='password'
          ></input>
          <br />
          <span className='edit__user__input__name'>비밀번호 확인</span>
          <input
            placeholder='비밀번호 확인'
            onChange={(e) => onchangePwdCk(e)}
            className='edit__password__check__input'
            type='password'
          ></input>
          <div
            className={
              passWord === passWordCheck
                ? 'edit__user__err hide'
                : 'edit__user__err'
            }
          >
            비밀번호가 일치하지 않습니다.
          </div>
          <br />
          <span className='edit__user__input__name'>UserName</span>
          <input
            onChange={(e) => onchangeName(e)}
            type='text'
            placeholder='이름'
            className='edit__username__input'
          ></input>
        </div>
        <button onClick={infoCorrection} className='edit__button__done'>
          수정
        </button>
        <div className='edit__title__content'>음식 취향</div>
        <div className='edit__preferece__box'>
          {sumLists.map((el) => {
            if (el.selected === false) {
              return (
                <div
                  onClick={() => selectFoodHandler(el.taste_id)}
                  className='edit__food'
                >
                  {el.name}
                </div>
              );
            } else {
              return (
                <div
                  onClick={() => selectFoodHandler(el.taste_id)}
                  className='edit__food__seleted'
                >
                  {el.name}
                </div>
              );
            }
          })}
        </div>
        <button onClick={foodCorrection} className='edit__button__done'>
          선택완료
        </button>
        <div className='edit__title__content'>식사 예절</div>
        <div className='edit__tablemanner__box'>
          {sumManner.map((el) => {
            if (el.selected === false) {
              return (
                <div
                  onClick={() => selectMannerHandler(el.text)}
                  className='edit__manner'
                >
                  {el.text}
                </div>
              );
            } else {
              return (
                <div
                  onClick={() => selectMannerHandler(el.text)}
                  className='edit__manner__selected'
                >
                  {el.text}
                </div>
              );
            }
          })}
        </div>
        <div className='edit__add__button'>
          <input
            onChange={(e) => onchangeAddManner(e)}
            placeholder='추가할 예절을 입력해주세요'
            type='text'
            className='edit__custom__manner__input'
          ></input>
          <button onClick={addMannerBtn} className='edit__custom__add'>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <button onClick={mannerCorrection} className='edit__button__done'>
          선택완료
        </button>
      </div>
    </div>
  );
}

export default EditInfo;
