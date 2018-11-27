const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//parola işlemleri
const passport = require('passport');
//RedisStore
const redisStore = require('./helpers/redisStore');
//session
const session = require('express-session');
//hem local hem global olarak projemizi calistirmak icin dotenv
const dotenv = require('dotenv');
dotenv.config();
//console.log(process.env.NAME);

const indexRouter    = require('./routes/index');
const authRouter     = require('./routes/auth');
const chatRouter     = require('./routes/chat');
const messagesRouter = require('./routes/messages');

const app = express();

//Db cagiriyoruz
const db = require('./helpers/db')();

//middleware giriş kontrolunu cagir
const isAuthenticated = require('./middleware/isAuthenticated');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//angular vb icin bower klasorunu kok dizin yapiyoruz
app.use(express.static(path.join(__dirname, 'bower_components')));

//express-session
app.use(session({
    store:redisStore,
    secret:process.env.SESSION_SECRET_KEY,
    resave:false,
    saveUninitialized:true,
    //cookie:{secure:true, maxAge: 14 * 24 * 3600000}secure httpsde calisiyor
    cookie:{  maxAge: 14 * 24 * 3600000 }
}));

//passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/chat', isAuthenticated, chatRouter);
app.use('/messages', isAuthenticated, messagesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
