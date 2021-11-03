import React,{ useState, useEffect } from 'react';
import './ChatBox.css';
import ScrollToBottom from 'react-scroll-to-bottom';

function ChatBox({ selectedCard, socket, user_id, name }) {
    // const { card_id, chat_title } = selectedCard.Card;
    const [writeMessage, setWriteMessage] = useState('');
    const [messages, setMessages] = useState([]);
    // 전체 메세지
    
    useEffect(() => {
        if (selectedCard) {
            socket.emit('req_messages', { user_id, card_id: selectedCard.card_id });
            socket.on('res_messages', (data) => {
            // data는 [messageInfo,messageInfo,messageInfo] 입니다.
            setMessages(data);
            });
        }
    }, [socket, selectedCard, user_id]);

    useEffect(() => {
        console.log(222)
        if (selectedCard) {
            console.log(333, selectedCard)
            socket.on('receive_message', (data) => {
            console.log(111,data)
        // data는 messageInfo 입니다.
            if (data[0].card_id === selectedCard.card_id) {
                setMessages([...messages, ...data]);
            }
        });
        socket.on('new_user', (data) => {
            if (data.card_id === selectedCard.card_id) {
                setMessages([...messages, data]);
                }
        });
        }
    }, [socket, messages, selectedCard]);

    const sendMessage = () => {
        if (writeMessage !== '') {
        const messageInfo = {
            card_id: selectedCard.card_id,
            user_id,
            name,
            message: writeMessage,
            date: new Date(Date.now()).toLocaleDateString(),
            time: `${new Date(Date.now()).getHours()}:${new Date(
                Date.now()
            ).getMinutes()}`,
        };
        document.querySelector('.chat__content__input').value = '';
        socket.emit('send_message', messageInfo);
        setWriteMessage('');
        // messagesHandler([...messages, messageInfo]);
        }
    };

    return (
        <div className='chatbox'>
            <div className='chatroom_title'>
            {selectedCard.chat_title? selectedCard.chat_title : '맞밥 채팅방 '}
            </div>
            {!selectedCard ?
                <div className='chat__contents'>
                    <div className='chat-body'>
                        <ScrollToBottom className='message-body'>
                            선택된 약속카드가 없습니다
                        </ScrollToBottom>
                    </div>
                </div>
                :
                <div className='chat__contents'>
                    {/* div태그로 하거나 or 컴포넌트로  */}
                    <div className='chat-body'>
                        <ScrollToBottom className='message-body'>
                            {messages.map((messageInfo, idx) => {
                                const { user_id, type, name, message, date, time } = messageInfo;
                                if (idx === 0) { // 페이지네이션 대비
                                    // 첫 요소에 날짜가 없을 때
                                    const dateArr = date.split('.');
                                    if (user_id === 0) { // 관리자 메세지
                                        if (type === 'message') {
                                            return (
                                                <div>
                                                    <div className='admin-date'>{`${dateArr[0]}년${dateArr[1].slice(0, 3)}월${dateArr[2].slice(0, 3)}일`}</div>
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
                                            <div className='admin-date'>{`${dateArr[0]}년${dateArr[1].slice(0, 3)}월${dateArr[2].slice(0, 3)}일`}</div>
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
                </div>
            }
            <div className='chat__send__conatiner'>
                <input onChange={(e) => setWriteMessage(e.target.value)} className='chat__content__input' placeholder='메세지를 입력하세요 💬'></input>
                {/* <textarea onChange={(e) => changeMessage(e)} className='chat__content__input' placeholder='메세지를 입력하세요'></textarea> */}
                <button onClick={() => sendMessage()} className='chat__send__button'>전송</button>
            </div>
        </div>
    )
}

export default ChatBox
