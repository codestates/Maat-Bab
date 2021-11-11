import React, { useState, useEffect, useRef } from 'react';
import List from '../Component/List';
import ChatBox from '../Component/ChatBox';
import MateList from '../Component/MateList';
import './ChatPage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LogInModal from '../Modal/LogInModal';
import ExitModal from '../Modal/ExitModal';
import io from 'socket.io-client';

function ChatPage() {
  const initial = useSelector((state) => state.userReducer);
  const { user_id, name } = initial.userInfo;
  const [myCardList, setMyCardList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(''); // 선택한 카드 객체?
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [loginModal, SetLoginModal] = useState(false);
  const [mateList, setMateList] = useState([]);
  const [messages, setMessages] = useState([]); // 전체 메세지
  const [check_messages, setCheck_messages] = useState(null);
  const socketRef = useRef();
  const selectedCard_id = useRef();
  const selectedCard_message = useRef();
  const check_messagesRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(`${process.env.REACT_APP_API_URL}`);
    axios
      .get(`${process.env.REACT_APP_API_URL}/card/${user_id}`)
      .then((res) => {
        if (!res.data) {
          setMyCardList(null);
        } else {
          console.log(res.data);
          const checkMessages = [];
          res.data.forEach((user_card) => {
            socketRef.current.emit('join_room', user_card.card_id);
            checkMessages.push({
              card_id: user_card.card_id,
              user_id,
              check_message: user_card.check_message,
            });
          });
          setMyCardList(res.data);
          setCheck_messages(checkMessages);
          check_messagesRef.current = checkMessages;
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

  useEffect(() => {
    if (socketRef.current && selectedCard.card_id) {
      console.log(selectedCard_id.current, selectedCard.card_id);
      socketRef.current.emit('req_messages', {
        user_id: user_id,
        card_id: selectedCard.card_id,
      });
      socketRef.current.on('res_messages', (data) => {
        // data는 [messageInfo,messageInfo,messageInfo]
        selectedCard_message.current = data;
        setMessages(data);
      });

      // * matelist
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/card?card_id=${selectedCard.card_id}`
        )
        .then((res) => {
          const user_card_list = res.data;
          setMateList(user_card_list);
        });
    }
  }, [user_id, selectedCard]);

  useEffect(() => {
    socketRef.current.on('receive_message', (data) => {
      // data는 messageInfo
      if (data[0].card_id === selectedCard_id.current) {
        setMessages([...selectedCard_message.current, ...data]);
        selectedCard_message.current = [
          ...selectedCard_message.current,
          ...data,
        ];
        // check_message
        for (const check_message of check_messagesRef.current) {
          if (check_message.card_id === selectedCard_id.current) {
            check_message.check_message = true;
            socketRef.current.emit('check_message', {
              card_id: check_message.card_id,
              user_id: check_message.user_id,
            });
          }
        }
        setCheck_messages(check_messagesRef.current.slice());
      } else {
        // check_message
        check_messagesRef.current = check_messagesRef.current.map(
          (check_message) => {
            if (check_message.card_id === data[0].card_id) {
              check_message.check_message = false;
            }
            return check_message;
          }
        );
        setCheck_messages(check_messagesRef.current.slice());
      }
    });
    socketRef.current.on('new_user', (data) => {
      if (data[0].card_id === selectedCard_id.current) {
        setMessages([...selectedCard_message.current, ...data]);
        selectedCard_message.current = [
          ...selectedCard_message.current,
          ...data,
        ];
      }
    });
  }, []);

  // * chatbox
  const leaveRoom = (data) => {
    socketRef.current.emit('leave_room', data); // data 는 selectedCard.card_id
  };

  const cardClickinChatHandler = async (card) => {
    selectedCard_id.current = card.card_id;
    await setSelectedCard(card);
    for (const check_message of check_messagesRef.current) {
      if (check_message.card_id === card.card_id) {
        check_message.check_message = true;
        await socketRef.current.emit('check_message', {
          card_id: check_message.card_id,
          user_id: check_message.user_id,
        });
      }
    }
    await setCheck_messages(check_messagesRef.current.slice());
  };

  const messageSendHandler = (messageInfo) => {
    socketRef.current.emit('send_message', messageInfo);
  };

  const deleteCardModalHandler = async () => {
    await setIsDeleteClicked(true);
  };

  const deleteCardHandler = async (card_id) => {
    setIsDeleteClicked(false);

    if (selectedCard?.card_id === card_id) {
      selectedCard_id.current = null;
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
      data.forEach((user_card) =>
        socketRef.current.emit('join_room', user_card.card_id)
      );
      setMyCardList(data);
    } else {
      setMyCardList(null);
    }
  };

  const hostDeleteCardHandler = async (card_id) => {
    setIsDeleteClicked(false);

    if (selectedCard?.card_id === card_id) {
      setSelectedCard('');
    }

    for (let i = 0; i < mateList.length; i++) {
      await leaveRoom(card_id);
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/card/${mateList[i].user_id}`,
        {
          data: { card_id: selectedCard.card_id },
        }
      );
    }

    const data = await axios
      .get(`${process.env.REACT_APP_API_URL}/card/${user_id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    if (data) {
      data.forEach((user_card) =>
        socketRef.current.emit('join_room', user_card.card_id)
      );
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
        check_messages={
          check_messages === null ? check_messages : check_messages
        }
      />

      {isDeleteClicked ? (
        <ExitModal
          card_id={selectedCard?.card_id}
          chat_title={selectedCard?.Card.chat_title}
          setIsDeleteClicked={setIsDeleteClicked}
          deleteCardHandler={deleteCardHandler}
          hostDeleteCardHandler={hostDeleteCardHandler}
          isHost={selectedCard.host}
        />
      ) : null}

      {selectedCard ? (
        <ChatBox
          className='chatpage__chat__container'
          my_user_id={user_id}
          my_name={name}
          selectedCard={selectedCard}
          isDeleteClicked={isDeleteClicked}
          messages={messages}
          messageSendHandler={messageSendHandler}
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
