import React,{useState, useEffect} from 'react';
import List from '../Component/List';
import ChatBox from '../Component/ChatBox';
import MateList from '../Component/MateList';
import './ChatPage.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ChatBoxJoin from '../Modal/ChatBoxJoin'
import InitialChatBox from '../Component/InitialChatBox';

function ChatPage() {
  const initial = useSelector(state => state.userReducer);
  const [myCardList, setMyCardList] = useState([])
  const [curCard, setCurCard] = useState({})
  const [isFirst, setIsFirst] = useState(true)
  const [isModal, setIsModal] = useState(false)
 
  useEffect(() => {

    axios.get(`http://localhost:80/card/${initial.userInfo.user_id}`)
    .then(res => setMyCardList([...myCardList,...res.data]))
  },[])


  return (
    <div className='chatpage'>
      {isModal ? <ChatBoxJoin setIsModal={setIsModal} setIsFirst={setIsFirst} />:null}
      {/* 나의 약속 카드 목록 */}
      <List title={'나의 맞밥 약속'} className='chatpage__list__container' curCard={curCard} setCurCard={setCurCard} setIsModal={setIsModal}/>
      {isFirst ? <InitialChatBox /> :
      <ChatBox className='chatpage__chat__container' /> }

      <MateList className='chatpage__mate__container' />

    </div>
  )
}

export default ChatPage
