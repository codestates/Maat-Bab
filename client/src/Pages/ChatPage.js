import React,{useState, useEffect} from 'react';
import List from '../Component/List';
import ChatBox from '../Component/ChatBox';
import MateList from '../Component/MateList';
import './ChatPage.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ChatBoxJoin from '../Modal/ChatBoxJoin'
import InitialChatBox from '../Component/InitialChatBox';
import LogInModal from '../Modal/LogInModal';

function ChatPage({ card_id }) {
  const initial = useSelector(state => state.userReducer);
  const [myCardList, setMyCardList] = useState([])
  const [curCard, setCurCard] = useState({})
  const [isFirst, setIsFirst] = useState(true)
  const [isModal, setIsModal] = useState(false)

  useEffect( async () => {
    console.log('initial.isLogin: ',initial.isLogin)
    console.log('initial.userInfo.user_id: ',initial.userInfo.user_id)

    await axios.get(`http://localhost:80/card/${initial.userInfo.user_id}`)
    .then(res => {
      setMyCardList([...myCardList, ...res.data])
      setIsFirst(false);
    })

  },[])

  useEffect(() => {
    console.log(`Now in ChatPage, state curCard is ${curCard} in useEffect`)
  }, [curCard])

  const cardClickinChatHandler = (id) => {
    console.log('joined card clicked');
    
    setCurCard(id);
    console.log(`Now in ChatPage, curCard : ${curCard} in handler`);
  }

  return (
    <div className='chatpage'>
      {!initial.userInfo.user_id ? <LogInModal /> : null}

      {isModal ? <ChatBoxJoin setIsModal={setIsModal} setIsFirst={setIsFirst} />:null}
      {/* 나의 약속 카드 목록 */}
      <List title={'나의 맞밥 약속'} className='chatpage__list__container'
        myCardList={myCardList}
        curCard={curCard} setCurCard={setCurCard}
        setIsModal={setIsModal}
        cardClickinChatHandler={cardClickinChatHandler}
      />
      {isFirst ? <InitialChatBox /> :
        <ChatBox className='chatpage__chat__container'
        curCard={curCard} setCurCard={setCurCard}
        setIsModal={setIsModal}
          cardClickinChatHandler={cardClickinChatHandler}/> }

      <MateList className='chatpage__mate__container' />

    </div>
  )
}

export default ChatPage
