require("dotenv").config({path: "./.env"})
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// database connection
const db = require("./models/connect")
db.connect()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// passport connection
const passport = require("passport")
const expressSession = require("express-session")
const userModel = require("./models/userSchema")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// passport setup
app.use(expressSession({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}))

app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(userModel.serializeUser())
passport.deserializeUser(userModel.deserializeUser())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);

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
