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

let socket;

function ChatPage() {
  const initial = useSelector((state) => state.userReducer);
  const { user_id, name } = initial.userInfo;
  const [myCardList, setMyCardList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(''); // 선택한 카드 객체?
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [loginModal, SetLoginModal] = useState(false);
  const [mateList, setMateList] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    socket = io.connect(`${process.env.REACT_APP_API_URL}`);
    axios
      .get(`${process.env.REACT_APP_API_URL}/card/${user_id}`)
      .then((res) => {
        if (!res.data) {
          setMyCardList(null);
        } else {
          res.data.forEach((user_card) =>
            socket.emit('join_room', user_card.card_id)
          );
          setMyCardList(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    if (user_id === null) {
      SetLoginModal(true);
    } else {
      SetLoginModal(false);
    }
  }, [user_id]);

  // * chatbox
  const leaveRoom = (data) => {
    socket.emit('leave_room', data); // data 는 selectedCard.card_id
  };

  const cardClickinChatHandler = async (card) => {
    await setSelectedCard(card);
  };

  const deleteCardModalHandler = async () => {
    await setIsDeleteClicked(true);
  };

  const deleteCardHandler = async (card_id) => {
    setIsDeleteClicked(false);

    if (selectedCard?.card_id === card_id) {
      setSelectedCard('');
    }
    leaveRoom(card_id);
    await axios.delete(`${process.env.REACT_APP_API_URL}/card/${user_id}`, {
      data: { card_id: selectedCard.card_id },
    });
    const data = await axios
      .get(`${process.env.REACT_APP_API_URL}/card/${user_id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    if (data) {
      data.forEach((user_card) => socket.emit('join_room', user_card.card_id));
      setMyCardList(data);
    } else {
      setMyCardList(null);
    }
  };
  const settingModal = () => {
    if (loginModal) {
      if (window.innerWidth > 768) {
        return <LogInModal SetLoginModal={SetLoginModal} />;
      } else {
        return (document.location.href = '/login');
      }
    } else {
      return null;
    }
  };

  // * matelist
  useEffect(() => {
    if (selectedCard) {
      console.log('selectedCard: ', selectedCard);
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/card?card_id=${selectedCard.card_id}`
        )
        .then((res) => {
          const user_card_list = res.data;
          setMateList(user_card_list);
        });
    }
  }, [selectedCard]);

  return (
    <div className='chatpage'>
      {settingModal()}

      <List
        className='chatpage__list__container'
        title={'나의 맞밥 약속'}
        cardData={myCardList}
        setMyCardList={setMyCardList}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        cardClickinChatHandler={cardClickinChatHandler}
        deleteCardModalHandler={deleteCardModalHandler}
        message={'카드를 클릭하여 채팅에 참여해 보세요'}
      />

      {isDeleteClicked ? (
        <ExitModal
          card_id={selectedCard?.card_id}
          chat_title={selectedCard?.Card.chat_title}
          setIsDeleteClicked={setIsDeleteClicked}
          deleteCardHandler={deleteCardHandler}
        />
      ) : null}

      {selectedCard ? (
        <ChatBox
          className='chatpage__chat__container'
          my_user_id={user_id}
          my_name={name}
          selectedCard={selectedCard}
          socket={socket}
          isDeleteClicked={isDeleteClicked}
        />
      ) : (
        <ChatBox className='chatpage__chat__container nonselected' />
      )}
      {selectedCard && mateList ? (
        <MateList
          className='chatpage__mate__container'
          selectedCard={selectedCard}
          my_user_id={user_id}
          userCardList={mateList}
        />
      ) : (
        <MateList className='chatpage__mate__container nonselected' />
      )}
    </div>
  );
}

export default ChatPage;
