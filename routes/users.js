const express = require("express");
const { user } = require("pg/lib/defaults");

const router = express.Router();

const sha256 = require("sha256");

const { User, Comment } = require("../db/models");

const {
  userChecker,
  deepCheckUser,
} = require("./middleWare/middlewares");

router.get("/registration", (req, res) => {
  res.render("registration");
});

router.post("/registration", async (req, res) => {
  const { login, email } = req.body;
  const password = sha256(req.body.password); // шифруем пароль
  const existUser = await User.findOne({ where: { email }, raw: true });
  if (existUser) {
    res.status(500).json({
      message:
        "a user with such an email is already registered in the database",
    });
  } else {
    try {
      const user = await User.create({
        role: false,
        login,
        email,
        password,
        isBanned: false,
      });
      req.session.userLogin = user.login; // записываем в сессию имя юзера, чтобы потмо его проверять (см в middlewares.js)
      req.session.userEmail = user.email;
      req.session.userId = user.id;
      res.json({ id: user.id });
      // res.redirect(`/users/lk/${user.id}`); // редирект на профиль нового юзера
    } catch (error) {
      res.status(400).json({ message: "ooops" });
    }
  } // создаем нового юзера
});

router.get("/login", (req, res) => {
  res.render("loggin");
});

router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } }); // ищем в бд юзера по почте
    if (!user) {
      return res.status(504).json({message: `there is no such user`});
    } 
    if (user.password === sha256(req.body.password)) {
      // если шифрованный пароль из бд совпадает с зашифрованным тем что ввел юзер
      req.session.userLogin = user.login; // записываем в сессию имя юзера, чтобы потмо его проверять (см middlewares.js)
      req.session.userEmail = user.email;
      req.session.userId = user.id;
      res.json({ id: user.id });
      // res.redirect(`/users/lk/${user.id}`);
    } else {
      res.send("wrong password");
    }
  } catch (error) {
    res.status(400).json({ message: "ooopsey" });
  }
});

router.get("/lk/:id", userChecker, deepCheckUser, async (req, res) => {
  // проходим мидлверы и попадаем в профиль
  const user = await User.findByPk(req.params.id);
  if (!user.role) {
  res.render("lk", { user: user.login });
  } else res.render("adminLk", { user: user.login });
});

router.get("/logout", (req, res) => {
  // при logout сессия удаляется из папки sessions
  req.session.destroy();
  res.clearCookie("tea_auth");
  res.redirect("/");
});

//add comments
router.post("/tea/:id", async (req,res)=>{
  const { body_text} = req.body;
  try { 
    const comm = await Comment.create({
    user_id: req.session.userLogin,
    body_text,
    tea_id:
  });
  res.send({body_text})
  } catch (error) {
    res.status(400).json({ message: "ooops" });
  }
});

module.exports = router;
