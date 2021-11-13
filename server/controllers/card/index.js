const { Restaurant, Card, User_card, User, Taste } = require('../../models');
const {
  isAuth,
  generateJoinMessage,
  generateLeaveMessage,
  generateDateMessage,
} = require('../../functions');

module.exports = {
  get: async (req, res) => {
    // current_headcount
    let { card_id, region, date, restaurant_name } = req.query;

    if (card_id) {
      card_id = Number(card_id);
      const cards = await User_card.findAll({
        where: { card_id },
        include: [
          {
            model: User,
            include: Taste,
          },
        ],
      });
      cards.forEach((user_card) => {
        const data = user_card.dataValues.User.dataValues;
        delete data.password;
        delete data.salt;
        data.etiquette = JSON.parse(data.etiquette);
        data.Tastes.forEach((taste) => {
          delete taste.dataValues.User_taste;
        });
      });
      return res.status(200).send(cards);
    }

    let cards = await Card.findAll();
    for (const card of cards) {
      delete card.dataValues.chat_content;
      const userList = await User_card.findAll({
        where: { card_id: card.card_id },
      });
      card.dataValues.current_headcount = userList.length;
    }

    if (region) {
      cards = cards.filter((card) => card.region === region);
    }
    if (date) {
      cards = cards.filter((card) => card.date === date);
    }
    if (restaurant_name) {
      cards = cards.filter((card) => card.restaurant_name === restaurant_name);
    }

    return res.status(200).send(cards);
  },
  post: async (req, res) => {
    const data = isAuth(req, res);
    if (!data) {
      return res.status(401).send();
    }

    const { user_id, name } = data;
    const {
      region,
      date,
      time,
      headcount,
      restaurant_name,
      chat_title,
      chat_content,
    } = req.body;
    if (!region || !date || !headcount || !chat_title) {
      return res.status(400).send();
    }

    if (restaurant_name) {
      Restaurant.findOrCreate({
        where: { restaurant_name },
        defaults: {
          restaurant_name,
          visit: 1,
        },
      })
        .then(([result, created]) => {
          if (!created) {
            const { visit } = result;
            Restaurant.update(
              { visit: visit + 1 },
              { where: { restaurant_name } }
            );
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send();
        });
    }

    const { card_id } = await Card.create({
      region,
      date,
      time,
      headcount,
      restaurant_name,
      chat_title,
      chat_content,
    }).catch((err) => {
      console.log(err);
      return res.status(500).send();
    });

    const message = generateJoinMessage(card_id, name);
    const dateMessage = generateDateMessage(card_id);

    await Card.update(
      { chat_content: JSON.stringify([dateMessage, message]) },
      { where: { card_id } }
    ).catch((err) => {
      console.log(err);
      return res.status(500).send();
    });

    await User_card.create({
      card_id,
      user_id,
      host: true,
      chat_content_idx: 0,
    }).catch((err) => {
      console.log(err);
      return res.status(500).send();
    });

    const card = await Card.findOne({ where: { card_id } }).catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
    delete card.dataValues.chat_content;

    return res.status(201).send(card);
  },
  user_id: {
    get: async (req, res) => {
      // current_headcount
      if (!isAuth(req, res)) {
        return res.status(401).send();
      }

      let { user_id } = req.params;
      user_id = Number(user_id);

      const cards = await User_card.findAll({
        where: { user_id },
        include: { model: Card },
      }).catch((err) => {
        console.log(err);
        return res.status(500).send();
      });

      for (const user_card of cards) {
        user_card.Card.chat_content = JSON.parse(user_card.Card.chat_content);
        const userList = await User_card.findAll({
          where: { card_id: user_card.card_id },
        });
        user_card.dataValues.Card.dataValues.current_headcount =
          userList.length;
      }

      return res.status(200).send(cards);
    },
    post: async (req, res) => {
      const data = isAuth(req, res);
      if (!data) {
        return res.status(401).send();
      }

      const { name } = data;
      let { user_id } = req.params;
      user_id = Number(user_id);
      const { card_id } = req.body;

      if (!card_id) {
        return res.status(400).send();
      }

      let { chat_content, headcount } = await Card.findOne({
        attributes: ['chat_content', 'headcount'],
        where: { card_id },
      }).catch((err) => {
        console.log(err);
        return res.status(500).send();
      });

      const userList = await User_card.findAll({ where: { card_id } });
      if (headcount === userList.length) {
        return res.status(204).send();
      }

      chat_content = JSON.parse(chat_content);
      const chat_content_idx = chat_content.length;

      await User_card.findOrCreate({
        where: { user_id, card_id },
        defaults: { user_id, card_id, host: false, chat_content_idx },
      })
        .then(async ([result, created]) => {
          if (!created) {
            return res.status(409).send();
          }

          let messages;
          const message = generateJoinMessage(card_id, name);
          if (chat_content[chat_content_idx - 1].date < message.date) {
            const dateMessage = generateDateMessage(card_id);
            messages = [dateMessage, message];
            chat_content = JSON.stringify(chat_content.concat(messages));
          } else {
            messages = [message];
            chat_content = JSON.stringify(chat_content.concat(messages));
          }

          await Card.update({ chat_content }, { where: { card_id } });
          req.app.get('io').to(card_id).emit('new_user', messages);

          return res.status(200).send(result);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send();
        });
    },
    delete: async (req, res) => {
      const data = isAuth(req, res);
      if (!data) {
        return res.status(401).send();
      }

      const { name } = data;
      let { user_id } = req.params;
      user_id = Number(user_id);
      const { card_id } = req.body;
      if (!card_id) {
        return res.status(400).send();
      }

      const userList = await User_card.findAll({ where: { card_id } }).catch(
        (err) => {
          console.log(err);
          return res.status(500).send();
        }
      );

      if (userList.length === 1) {
        await Card.destroy({ where: { card_id } });
        await User_card.destroy({ where: { user_id, card_id } });
      } else {
        const { host } = userList.filter((user_card) => {
          return user_card.user_id === user_id;
        })[0];

        if (host) {
          const otherUserinfo = userList.filter((userinfo) => {
            return userinfo.user_id !== user_id;
          })[0];

          await User_card.update(
            { host: true },
            { where: { card_id, user_id: otherUserinfo.user_id } }
          );
        }

        let messages;
        const message = generateLeaveMessage(card_id, name);
        const dateMessage = generateDateMessage(card_id);

        let { chat_content } = await Card.findOne({ where: { card_id } });
        if (chat_content === null) {
          messages = [dateMessage, message];

          await Card.update(
            {
              chat_content: JSON.stringify(messages),
            },
            { where: { card_id } }
          );
        } else {
          chat_content = JSON.parse(chat_content);

          if (chat_content[chat_content.length - 1].date < message.date) {
            messages = [dateMessage, message];
          } else {
            messages = [message];
          }

          await Card.update(
            { chat_content: JSON.stringify([...chat_content, ...messages]) },
            { where: { card_id } }
          );
        }

        await User_card.destroy({ where: { user_id, card_id } });
        const io = req.app.get('io');
        await io.to(card_id).emit('receive_message', messages);
      }
      const user_card = userList.filter((user_card) => {
        return user_card.user_id === user_id;
      })[0];

      return res.status(205).send(user_card);
    },
  },
};
