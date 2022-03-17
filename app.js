require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const logger = require('morgan');
const app = express();

//adding routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

//Miidleware setup
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


// вынести в отдельный файл
app.use(session({
  secret: process.env.SECRET ?? 'dsklfjghsldfhglsdufhglkjs',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  name: 'tea_auth'
}));

//routes middleware
app.use('/', indexRouter);
app.use('/users', usersRouter);


minor

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.listen(process.env.PORT ?? 3000, () =>{
  console.log('Server started on PORT :'+ process.env.PORT);
})

module.exports = app;
