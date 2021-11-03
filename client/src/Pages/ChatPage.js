import React,{useState, useEffect} from 'react';
import List from '../Component/List';
import ChatBox from '../Component/ChatBox';
import MateList from '../Component/MateList';
import './ChatPage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LogInModal from '../Modal/LogInModal';
import io from 'socket.io-client';

const socket = io.connect(`http://localhost:80`);

function ChatPage() {
  const initial = useSelector(state => state.userReducer);
  const { user_id, name } = initial.userInfo;
  const [myCardList, setMyCardList] = useState([]);
  const [selectedCard, setSelectedCard] = useState('');
  // 선택한 카드 객체?

  // eslint-disable-next-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    // const getUserCardList = async () => {
      // const data =
        axios.get(`http://localhost:80/card/${user_id}`)
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
      
        // if (!data.length) {
        //   setMyCardList(data);
        // } else {
        //   data.forEach(user_card => socket.emit('join_room', user_card.card_id));
        //   setMyCardList(data);
        // }

        // if (data) {
        //   data.forEach(user_card => socket.emit('join_room', user_card.card_id));
        // }
        // setMyCardList(data);
      
    // }
    // getUserCardList();
    console.log('myCardList: ', myCardList);
  }, [])
  // }, [socket, user_id])

  // * chatbox
  const leaveRoom = (data) => {
    socket.emit('leave_room', data);
    // data 는 selectedCard.card_id
  };

  const cardClickinChatHandler = async (user_card) => {    
    console.log('user_card: ',user_card);
    // await setSelectedCard(user_card.Card)
    await setSelectedCard(user_card)

    // let newUser_card = Object.assign({}, user_card);
    // await setSelectedCard(newUser_card.Card);
  }

  return (
    <div className='chatpage'>
      {!user_id ? <LogInModal /> : null}

      <List title={'나의 맞밥 약속'} className='chatpage__list__container'
        myCardList={myCardList}
        cardClickinChatHandler={cardClickinChatHandler}
        leaveRoom={leaveRoom}
      />

      {selectedCard ?
        (<ChatBox className='chatpage__chat__container'
          user_id={user_id}
          name={name}
          selectedCard={selectedCard}
          socket={socket}
        />)
        :
        'no contents'
      }
      <MateList className='chatpage__mate__container' />
    </div>
  )
}

export default ChatPage
