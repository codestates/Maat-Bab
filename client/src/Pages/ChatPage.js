import React, { useState, useEffect } from 'react';
import List from '../Component/List';
import ChatBox from '../Component/ChatBox';
import MateList from '../Component/MateList';
import './ChatPage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LogInModal from '../Modal/LogInModal';
import ExitModal from '../Modal/ExitModal';
import io from 'socket.io-client';
import { setLoginStatus } from '../actions';

const socket = io.connect(
  `http://localhost:${process.env.REACT_APP_SERVER_PORT}`
);

function ChatPage() {
  const initial = useSelector((state) => state.userReducer);
  const { user_id, name } = initial.userInfo;
  const [myCardList, setMyCardList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(''); // 선택한 카드 객체?
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [loginModal, SetLoginModal] = useState(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps  
  useEffect(() => {
    axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/card/${user_id}`)
    .then(res => {
      if (!res.data.length) {
        setMyCardList(res.data);
      } else {
        res.data.forEach(user_card => socket.emit('join_room', user_card.card_id));
        setMyCardList(res.data);
      }
    })
    .catch(err => {
      console.log(err);
    });
    if(user_id === null){
      SetLoginModal(true)
    }else{
      SetLoginModal(false)
    }
      
  }, [])


  // * chatbox
  const leaveRoom = (data) => {
    socket.emit('leave_room', data); // data 는 selectedCard.card_id
  };

  const cardClickinChatHandler = async (card) => {    
    await setSelectedCard(card)
  }

  const deleteCardModalHandler = async () => {
    await setIsDeleteClicked(true);
  }

  const deleteCardHandler = async (card_id) => {
    setIsDeleteClicked(false);

    if (selectedCard?.card_id === card_id) {
      setSelectedCard('');
    }
    leaveRoom(card_id);
    await axios.delete(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/card/${user_id}`, {
    data: { card_id : selectedCard.card_id },
    });
    const data = await axios
      .get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/card/${user_id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err)
      });
    if (data) {
      data.forEach((user_card) => socket.emit('join_room', user_card.card_id));
      setMyCardList(data);
    } else {
      setMyCardList([])
    }
  };
  const settingModal = () => {
    if(loginModal){
      if(window.innerWidth > 768){
        return <LogInModal SetLoginModal={SetLoginModal} />
      }else{
        return document.location.href = '/login'
      }
    }else{
      return null
    }
  }

  return (
    <div className='chatpage'>
      {settingModal()}

        <List className='chatpage__list__container'
        title={'나의 맞밥 약속'}
        cardData={myCardList} setMyCardList={setMyCardList}
        selectedCard={selectedCard} setSelectedCard={setSelectedCard}
        cardClickinChatHandler={cardClickinChatHandler}
        deleteCardModalHandler={deleteCardModalHandler}
      />

      {isDeleteClicked ? <ExitModal card_id={selectedCard?.card_id} chat_title={selectedCard?.Card.chat_title} setIsDeleteClicked={setIsDeleteClicked} deleteCardHandler={deleteCardHandler}
      /> : null}
      
      {selectedCard ? (
        <ChatBox className='chatpage__chat__container'
          my_user_id={user_id}
          name={name}
          selectedCard={selectedCard}
          socket={socket}
          isDeleteClicked={isDeleteClicked}
        />)
        :
        (<ChatBox className='chatpage__chat__container nonselected'
        />)
      }
      {selectedCard ?
        <MateList className='chatpage__mate__container'
          selectedCard={selectedCard}
          my_user_id={user_id}
        />
        :
        <MateList className='chatpage__mate__container nonselected'
        />
      }
    </div>
  );
}

export default ChatPage;
