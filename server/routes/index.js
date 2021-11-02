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
router.get('/oauth/kakao', kakao.post);
router.post('/same-email', sameEmail.post);
router.get('/userinfo', userinfo.get);
router.patch('/userinfo', userinfo.patch);
router.delete('/userinfo', userinfo.delete);
router.get('/taste', taste.get);
router.get('/userinfo/taste', userinfo.taste.get);
router.patch('/userinfo/taste', userinfo.taste.patch);
router.get('/userinfo/etiquette', userinfo.etiquette.get);
router.patch('/userinfo/etiquette', userinfo.etiquette.patch);
router.post('/mail', mail.post);
router.patch('/certification', certification.patch);

// Card
router.get('/card', card.get);
router.post('/card', card.post);
router.get('/card/:user_id', card.user_id.get);
router.post('/card/:user_id', card.user_id.post);

module.exports = router;
