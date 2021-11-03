import React,{useState, useEffect} from 'react';
import List from '../Component/List';
import ChatBox from '../Component/ChatBox';
import MateList from '../Component/MateList';
import './ChatPage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LogInModal from '../Modal/LogInModal';
import io from 'socket.io-client';

function ChatPage() {
  const initial = useSelector(state => state.userReducer);

  const [myCardList, setMyCardList] = useState([]);
  const [selectedCard, setSelectedCard] = useState('');
  const socket = io.connect(`http://localhost:80`);
  // 선택한 카드 객체?

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const getUserCardList = async () => {
    const data = await axios.get(`http://localhost:80/card/${initial.userInfo.user_id}`)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return [];
      })
    
    if (data) {
      data.forEach(user_card => socket.emit('join_room', user_card.card_id));
    }
    setMyCardList(data);
    
    // if (!data.length) {
    //   setMyCardList(data);
    // } else {
    //   data.forEach(user_card => socket.emit('join_room', user_card.card_id));
    //   setMyCardList(data);
    // }
  }

  useEffect(async () => {
    await getUserCardList();
    console.log('myCardList: ', myCardList);

    console.log('000', `Now in ChatPage, state selectedCard Id is ${selectedCard?.card_id} in useEffect`)

    console.log('selectedCard: ', selectedCard);

  }, [])

  useEffect(async () => {
    console.log('000', `Now in ChatPage, state selectedCard Id is ${selectedCard?.card_id} in useEffect`)

    console.log('selectedCard: ', selectedCard);

  }, [selectedCard])

  // * chatbox
  const leaveRoom = (data) => {
    socket.emit('leave_room', data);
    // data 는 selectedCard.card_id
  };

  const cardClickinChatHandler = async (user_card) => {
    await console.log(111, `selectedCard id : no.${selectedCard?.card_id} yet`);
    await console.log(user_card);
    await console.log(222, `user_card id : no.${user_card.card_id} clicked`);
    
    // let newUser_card = Object.assign({}, user_card);
    // setSelectedCard(newUser_card);
    await setSelectedCard(user_card.Card)
    await console.log(333, `selectedCard id : no.${selectedCard?.card_id} now`);
    
    await socket.emit('join_room', selectedCard.card_id)
  }

  return (
    <div className='chatpage'>
      {!initial.userInfo.user_id ? <LogInModal /> : null}

      <List title={'나의 맞밥 약속'} className='chatpage__list__container'
        myCardList={myCardList}
        cardClickinChatHandler={cardClickinChatHandler}
        leaveRoom={leaveRoom}
      />

      {!selectedCard ? 
      (<ChatBox className='chatpage__chat__container non-selected'
      selectedCard={selectedCard}
          socket={socket}
        />)
      :
        (<ChatBox className='chatpage__chat__container'
          selectedCard={selectedCard}
          socket={socket}
          /> )}

      <MateList className='chatpage__mate__container' />

    </div>
  )
}

export default ChatPage
