var express = require('express');
var router = express.Router();
var Cat = require('../models/cat').Cat;

var site = 'https://kemalzeitulaev.github.io/Aip';
var eyebrows = {
  '911': 'Икона',
  'gt3': 'Motorsport',
  'taycan': 'Electric'
};

router.get('/', function(req, res, next) {
  res.send('Новый маршрутизатор, для маршрутов, начинающихся с cats');
});

/* Страница модели */
router.get('/:nick', async function(req, res, next) {
  try {
    var cats = await Cat.find({ nick: req.params.nick });
    console.log(cats);
    if (!cats.length) return next(new Error('Нет такой модели'));
    var cat = cats[0];
    res.render('model', {
      title: cat.title,
      picture: cat.avatar,
      desc: cat.desc,
      eyebrow: eyebrows[cat.nick] || 'Porsche',
      page: site + '/' + cat.nick + '.html'
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
