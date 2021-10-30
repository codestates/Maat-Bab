require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const router = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
    credentials: true,
  })
);
app.use('/', router);

// socket.io
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
    credentials: true,
  },
});
const { Card } = require('./models');

io.on('connection', (socket) => {
  console.log(`connection//
    socketID : ${socket.id}`);

  socket.on('join_room', (data) => {
    if (!data) return;
    socket.join(data);
    console.log(`join_room//
    socketID : ${socket.id}
    card_id : ${data}번 카드방으로 연결되었습니다.`);
    console.log('연결되어 있는 카드방 : ', socket.rooms);
  });

  socket.on('leave_room', (data) => {
    if (!data) return;
    socket.leave(data);
    console.log(`leave_room//
    socketID : ${socket.id}
    card_id : ${data}번 카드방에서 나갔습니다.`);
    console.log('연결되어 있는 카드방 : ', socket.rooms);
  });

  socket.on('req_messages', async (data) => {
    if (!data) return;
    const { chat_content } = await Card.findOne({ where: { card_id: data } });
    console.log(`req_messages//
    socketID : ${socket.id}
    조회한 메세지 : ${chat_content}`);
    if (chat_content === null) {
      await socket.emit('res_messages', []);
    } else {
      await socket.emit('res_messages', JSON.parse(chat_content));
    }
  });

  socket.on('send_message', async (data) => {
    if (!data) return;
    const { card_id, user_id, name, message, time } = data;

    const { chat_content } = await Card.findOne({ where: { card_id } });

    let messages;
    if (chat_content === null) {
      messages = JSON.stringify([data]);
    } else {
      messages = JSON.stringify([...JSON.parse(chat_content), data]);
    }
    await Card.update({ chat_content: messages }, { where: { card_id } });

    console.log(`send_message//
    socketID : ${socket.id},
    userID : ${user_id},
    ${name}님이 ${card_id}번 카드방으로 ${time}시간대에 메세지를 보냈습니다.
    message : ${message}`);
    await socket.broadcast.to(card_id).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`disconnect//
    socketID : ${socket.id}`);
  });
});

const PORT = process.env.PORT || 80;
server.listen(PORT, () => console.log(`Dev-Child server is running at ${PORT} port`));
