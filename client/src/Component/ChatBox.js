import React,{useState} from 'react';
import './ChatBox.css';
import io from 'socket.io-client';
function ChatBox({ isModal, setIsModal, curCard, setCurCard }) {
    // curCard = 현재 클릭한 카드 아이디

    // const socket = io.connect(`http://localhost:80`)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
//상태

const changeMessage = (event) => {
    setMessage(event.target.value)
}

const sendMessage = () => {

}

//함수
    return (
        <div className='chatbox'>
            <div className='chatroom_title'>
                맞밥 채팅방
            </div>
            <div className='chat__contents'> {/*div태그로 하거나 or 컴포넌트로  */}

            </div>
            <div className='chat__send__conatiner'>
                <textarea onChange={(e) => changeMessage(e)} className='chat__content__input'></textarea>
                <button onClick={sendMessage} className='chat__send__button'>전송</button>
            </div>

        </div>
    )
}

export default ChatBox
