import React,{ useState, useEffect } from 'react';
import './ChatBox.css';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';

function ChatBox({ isModal, setIsModal, selectedCard, curCard, setCurCard, previousSelected_id }) {
    const initial = useSelector(state => state.userReducer);
    const { user_id, name } = initial.userInfo;

    const socket = io.connect(`http://localhost:80`)

    const changeMessage = (event) => {
        setSendingText(event.target.value)
    }

    const { card_id, chat_title } = selectedCard;
    const [sendingText, setSendingText] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    // 전체 메세지

    useEffect(() => {
        console.log('selectedCard: ', selectedCard);
        if (selectedCard && !previousSelected_id) {
            socket.emit('join_room', selectedCard.card_id);
            socket.emit('req_messages', {user_id, card_id: selectedCard.card_id});
            socket.on('res_messages', (data) => {
                // data는 [messageInfo,messageInfo,messageInfo] 입니다.
                setChatMessages(data);
            });
        } else if (selectedCard && previousSelected_id) {
            socket.emit('leave_room', previousSelected_id);
            socket.emit('join_room', selectedCard.card_id);
            socket.emit('req_messages', {user_id, card_id: selectedCard.card_id});
            socket.on('res_messages', (data) => {
                // data는 [messageInfo,messageInfo,messageInfo] 입니다.
                setChatMessages(data);
            });
        }
    }, [socket, selectedCard, user_id, previousSelected_id]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            // data는 messageInfo 입니다.
            if (data[0].card_id === selectedCard.card_id) {
                setChatMessages([
                    ...chatMessages,
                    ...data
                ]);
            }
        });
        socket.on('new_user', (data) => {
            if (data.card_id === selectedCard.card_id) {
                setChatMessages([
                    ...chatMessages,
                    data
                ]);
            }
        });
    }, [socket, chatMessages, selectedCard]);

    const sendMessage = () => {
        if (sendingText !== '') {
            const messageInfo = {
                card_id,
                user_id,
                name,
                message: sendingText,
                date: new Date(Date.now()).toLocaleDateString(),
                time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
            };
            document
                .querySelector('.write-message')
                .value = '';
            socket.emit('send_message', messageInfo);
            setSendingText('');
            // messagesHandler([...sendingText, messageInfo]);
        }
    };

    return (
        <div className='chatbox'>
            <div className='chatroom_title'>
            {chat_title? chat_title : '맞밥 채팅방'}
            </div>
            <div className='chat__contents'> {/*div태그로 하거나 or 컴포넌트로  */}    
            <div className='chat-body'>
            <ScrollToBottom className='message-body'>
                {chatMessages.map((messageInfo, idx) => {
                const { user_id, type, name, message, date, time } = messageInfo;
                if (idx === 0) {
                    // 페이지네이션 대비
                    // 첫 요소에 날짜가 없을 때
                    const dateArr = date.split('.');
                    if (user_id === 0) {
                    // user_id === 0 일 때는 관리자 메세지
                    if (type === 'message') {
                        return (
                        <div>
                            <div className='admin-date'>{`${
                            dateArr[0]
                            }년${dateArr[1].slice(0, 3)}월${dateArr[2].slice(
                            0,
                            3
                            )}일`}</div>
                            <div className='admin-message'>{message}</div>
                        </div>
                        );
                    } else if (type === 'date') {
                        return (
                        <div>
                            <div className='admin-date'>{message}</div>
                        </div>
                        );
                    }
                    }
                    return (
                    <div>
                        <div className='admin-date'>{`${
                        dateArr[0]
                        }년${dateArr[1].slice(0, 3)}월${dateArr[2].slice(
                        0,
                        3
                        )}일`}</div>
                        <div>{message}</div>
                        <div>
                        <span>{name}</span> <span>{time}</span>
                        </div>
                        <div>{message}</div>
                        <div>
                        <span>{name}</span> <span>{time}</span>
                        </div>
                    </div>
                    );
                }
                if (user_id === 0) {
                    if (type === 'message') {
                    return (
                        <div>
                        <div className='admin-message'>{message}</div>
                        </div>
                    );
                    } else if (type === 'date') {
                    return (
                        <div>
                        <div className='admin-date'>{message}</div>
                        </div>
                    );
                    }
                }
                return (
                    <div>
                    <div>{message}</div>
                    <div>
                        <span>{name}</span> <span>{time}</span>
                    </div>
                    </div>
                );
                })}
            </ScrollToBottom>
            </div>
            <div className='chat-footer'>
            <input
                className='write-message'
                type='text'
                placeholder='보낼 메세지'
                onChange={(e) => {
                setSendingText(e.target.value);
                }}
            ></input>
            <button className='chatBtn' onClick={() => sendMessage()}>
                전송
            </button>
            </div>
            </div>
            <div className='chat__send__conatiner'>
                <textarea onChange={(e) => changeMessage(e)} className='chat__content__input'></textarea>
                <button onClick={sendMessage} className='chat__send__button'>전송</button>
            </div>

        </div>
    )
}

export default ChatBox
