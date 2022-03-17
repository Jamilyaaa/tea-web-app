const express = require('express');
const router = express.Router();
const { userChecker } = require('./middleWare/middlewares');


router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// userChecker либо пропустит (c помощью next()) в функцию, которая рендерит lk страницу, либо редиректнет на главную

router.get('/', userChecker, (req, res) => {
  res.render('lk');
});

module.exports = router;