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

const PORT = process.env.PORT || 80;
server.listen(PORT, () => console.log(`Dev-Child server is running at ${PORT} port`));

// socket.io
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
    credentials: true,
  },
});
const { Card, User_card } = require('./models');

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
    const { user_id, card_id } = data;
    const { chat_content } = await Card.findOne({ where: { card_id } });
    const { chat_content_idx } = await User_card.findOne({
      where: { user_id, card_id },
    });

    let messages;
    if (chat_content === null) {
      messages = [];
      await socket.emit('res_messages', messages);
    } else {
      messages = JSON.parse(chat_content).slice(chat_content_idx);
      await socket.emit('res_messages', messages);
    }
    console.log(`req_messages//
    socketID : ${socket.id}
    조회한 메세지 : ${JSON.stringify(messages)}`);
  });

  socket.on('send_message', async (data) => {
    if (!data) return;
    const { card_id, user_id, name, message, date, time } = data;

    let { chat_content } = await Card.findOne({ where: { card_id } });

    let messages;
    const dateArr = date.split('.');
    let dateMessage = {
      card_id,
      user_id: 0,
      type: 'date',
      message: `${dateArr[0]}년${dateArr[1].slice(0, 3)}월${dateArr[2].slice(0, 3)}일`,
      date: new Date(Date.now()).toLocaleDateString(),
      time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
    };

    if (chat_content === null) {
      messages = [dateMessage, data];

      await Card.update({ chat_content: JSON.stringify(messages) }, { where: { card_id } });
    } else {
      chat_content = JSON.parse(chat_content);

      if (chat_content[chat_content.length - 1].date < data.date) {
        messages = [dateMessage, data];
      } else {
        messages = [data];
      }

      await Card.update({ chat_content: JSON.stringify([...chat_content, ...messages]) }, { where: { card_id } });
    }

    await io.to(card_id).emit('receive_message', messages);
    console.log(`send_message//
    socketID : ${socket.id},
    userID : ${user_id},
    ${name}님이 ${card_id}번 카드방으로 ${time}시간대에 메세지를 보냈습니다.
    message : ${message}`);
  });

  socket.on('disconnect', () => {
    console.log(`disconnect//
    socketID : ${socket.id}`);
  });
});

app.set('io', io);

module.exports = app;
