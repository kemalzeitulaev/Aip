var express = require('express');
var router = express.Router();
var Porsche = require('../models/porsche').Porsche;

var site = 'https://kemalzeitulaev.github.io/Aip';
var eyebrows = {
  '911': 'Икона',
  'gt3': 'Motorsport',
  'taycan': 'Electric'
};

router.get('/', function(req, res, next) {
  res.send('Новый маршрутизатор, для маршрутов, начинающихся с porsche');
});

/* Страница модели */
router.get('/:nick', async function(req, res, next) {
  try {
    var models = await Porsche.find({ nick: req.params.nick });
    console.log(models);
    if (!models.length) return next(new Error('Нет такой модели'));
    var car = models[0];
    res.render('model', {
      title: car.title,
      picture: car.avatar,
      desc: car.desc,
      eyebrow: eyebrows[car.nick] || 'Porsche',
      page: site + '/' + car.nick + '.html'
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
