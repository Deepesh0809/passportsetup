var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage', user: req.user });
});

router.get('/register', function(req, res, next) {
  res.render('register',{title: "Register page", user: req.user});
});

router.get('/login', function(req, res, next) {
  res.render('login',{title: "Login page", user: req.user});
});

module.exports = router;
