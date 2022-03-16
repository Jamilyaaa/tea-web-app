require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// вынести в отдельный файл
app.use(session({
  secret: process.env.SECRET ?? 'dsklfjghsldfhglsdufhglkjs',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false},
  name: 'tea_auth'
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.listen(process.env.PORT ?? 3000, () =>{
  console.log('Server started on PORT :'+ process.env.PORT);
})

module.exports = app;
