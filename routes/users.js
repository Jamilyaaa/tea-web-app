const express = require('express');

const router = express.Router();

const sha256 = require('sha256');

const { User } = require('../db/models');
const { userChecker, deepCheckUser, showBody } = require('./middleWare/middlewares');



router.get('/registration', (req, res) => {
  res.render('registration');
});

router.post('/registration', async (req, res) => {
  const { login, email } = req.body;
  const password = sha256(req.body.password); // шифруем пароль
  const user = await User.create({ role: false, login, email, password, isBanned:false }); // создаем нового юзера
  req.session.userLogin = user.login; // записываем в сессию имя юзера, чтобы потмо его проверять (см в middlewares.js)
  req.session.userEmail = user.email;
  req.session.userId = user.id;
  res.render('ok')
  //res.redirect(`users/lk/${user.id}`); // редирект на профиль нового юзера
});

router.get('/login', (req, res) => {
  res.render('loggin');
});

router.post('/login', showBody, async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } }); // ищем в бд юзера по почте
  if (!user) {
    return res.redirect('/users/registration');
  }
  if (user.password === sha256(req.body.password)) { // если шифрованный пароль из бд совпадает с зашифрованным тем что ввел юзер
    req.session.userLogin = user.login; // записываем в сессию имя юзера, чтобы потмо его проверять (см middlewares.js)
    req.session.userEmail = user.email;
    req.session.userId = user.id;
    res.redirect(`/users/lk/${user.id}`);
  } else {
    res.send('wrong password');
  }
});

router.get('/lk/:id', userChecker, deepCheckUser, async (req, res) => { // проходим мидлверы и попадаем в профиль
  const user = await User.findByPk(req.params.id);
  res.render('lk', { user });
});

router.get('/logout', (req, res) => {
  // при logout сессия удаляется из папки sessions
  req.session.destroy();
  res.clearCookie('userCookie');
  res.redirect('/');

});

module.exports = router;
