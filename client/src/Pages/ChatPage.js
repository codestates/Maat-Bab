import React,{useState, useEffect} from 'react';
import List from '../Component/List';
import ChatBox from '../Component/ChatBox';
import MateList from '../Component/MateList';
import './ChatPage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ChatBoxJoin from '../Modal/ChatBoxJoin'
import InitialChatBox from '../Component/InitialChatBox';
import LogInModal from '../Modal/LogInModal';
import io from 'socket.io-client';

function ChatPage() {
  const initial = useSelector(state => state.userReducer);

  const [isFirst, setIsFirst] = useState(true);
  const [isModal, setIsModal] = useState(false);

  const [myCardList, setMyCardList] = useState([]);
  const [previousSelected_id, setPreviousSelected_id] = useState('');
  const [selectedCard, setSelectedCard] = useState('');
  // 선택한 카드 객체?

  const socket = io.connect(`http://localhost:80`)

  useEffect(async () => {
    await axios.get(`http://localhost:80/card/${initial.userInfo.user_id}`)
    .then(res => {
      setMyCardList([...myCardList, ...res.data])
      setIsFirst(false);
    })
    console.log(`Now in ChatPage, state selectedCard Id is ${selectedCard.card_id} in useEffect`)

    myCardList.forEach((user_card) => {
      socket.emit('leave_room', user_card.card_id);
    });
    if (selectedCard) {
      socket.emit('join_room', selectedCard.card_id);
    }


  }, [myCardList, selectedCard])

  

  // * chatbox
  const leaveRoom = (data) => {
    // 나의 카드 조회가 아닌 다른 페이지로 갈 경우 반드시 leaveRoom으로 seletedCard.card_id를 data에 넣어줘야 합니다.
    // data에는 card_id 들어와야합니다.
    socket.emit('leave_room', data);
    // data 는 selectedCard.card_id
  };

  const cardClickinChatHandler = async (user_card) => {
    console.log('one of my joined card clicked');
    
    let newUser_card = Object.assign({}, user_card);
    setSelectedCard(newUser_card);
    // 선택한 카드로 상태를 바꾸며, 바뀐 카드의 이전 메세지들을 요청합니다.
    // if (!selectedCard) {
    //   let newUser_card = Object.assign({}, user_card);
    //   await setSelectedCard(newUser_card);
    // } else {
    //   const previous = selectedCard.card_id;
    //   await setPreviousSelected_id(previous);
    //   let newUser_card = Object.assign({}, user_card);
    //   await setSelectedCard(newUser_card);
    // }
  }

  return (
    <div className='chatpage'>
      {!initial.userInfo.user_id ? <LogInModal /> : null}

      {isModal ? <ChatBoxJoin setIsModal={setIsModal} setIsFirst={setIsFirst} />:null}
      {/* 나의 약속 카드 목록 */}
      <List title={'나의 맞밥 약속'} className='chatpage__list__container'
        myCardList={myCardList}
        setIsModal={setIsModal}
        cardClickinChatHandler={cardClickinChatHandler}
      />
      {isFirst ? <InitialChatBox /> :
        <ChatBox className='chatpage__chat__container'
        selectedCard={selectedCard}
        setIsModal={setIsModal}
          /> }

      <MateList className='chatpage__mate__container' />

    </div>
  )
}

export default ChatPage
