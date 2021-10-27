const router = require('express').Router();
const {
  auth,
  signup,
  signin,
  signout,
  kakao,
  userinfo,
  taste,
  card,
  chat,
  sameEmail,
  mail,
  certification,
} = require('../controllers');

// Basic
router.get('/', (req, res) => {
  res.status(200).send('hello maat-bab');
});

// User
router.get('/auth', auth.get);
router.post('/signup', signup.post);
router.post('/signin', signin.post);
router.post('/signout', signout.post);
router.post('/oauth/kakao', kakao.post);
router.post('/same-email', sameEmail.post);
router.get('/userinfo/:user_id', userinfo.get);
router.patch('/userinfo/:user_id', userinfo.patch);
router.delete('/userinfo/:user_id', userinfo.delete);
router.get('/taste', taste.get);
router.get('/userinfo/taste/:user_id', userinfo.taste.user_id.get);
router.patch('/userinfo/taste/:user_id', userinfo.taste.user_id.patch);
router.get('/userinfo/etiquette/:user_id', userinfo.etiquette.user_id.get);
router.patch('/userinfo/etiquette/:user_id', userinfo.etiquette.user_id.patch);
router.post('/mail/:email', mail.email.post);
router.patch('/certification/:email', certification.email.patch);

// Card
router.get('/card', card.get);
router.post('/card', card.post);
router.get('/card/:user_id', card.user_id.get);
router.post('/card/:user_id', card.user_id.post);

// Chat
router.get('/chat/:card_id', chat.get);
router.post('/chat/:card_id', chat.post);

module.exports = router;
