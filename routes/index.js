var express = require('express');
var router = express.Router();
var User = require('../models/user').User;

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.greeting = 'Hi!!!';
  res.render('index', { title: 'Porsche', counter: req.session.counter });
});

/* GET login/registration page. */
router.get('/logreg', function(req, res, next) {
  res.render('logreg', { title: 'Вход' });
});

router.post('/logreg', async function(req, res, next) {
  try {
    var username = req.body.username;
    var password = req.body.password;
    var users = await User.find({ username: username });
    if (!users.length) {
      var user = new User({ username: username, password: password });
      await user.save();
      req.session.user_id = user._id;
      res.redirect('/');
    } else {
      var foundUser = users[0];
      if (foundUser.checkPassword(password)) {
        req.session.user_id = foundUser._id;
        res.redirect('/');
      } else {
        res.render('logreg', { title: 'Вход' });
      }
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
