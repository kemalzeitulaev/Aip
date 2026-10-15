var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Страница Коржика */
router.get('/korzhik', function(req, res, next) {
  res.render('porsche', {
    title: "Коржик",
    picture: "/images/korzhik.png",
    desc: "Средний котёнок в семье. Очень любит футбол. Любит бегать, прыгать и веселиться. Иногда делает такие вещи, что из них приходится выбираться всей семье. Одет в форму моряка."
  });
});

/* Страница Карамельки */
router.get('/karamelka', function(req, res, next) {
  res.render('porsche', {
    title: "Карамелька",
    picture: "/images/karamelka.jpeg",
    desc: "Самый младший член семьи. Коронная фраза — «Я знаю, что надо делать!». Носит красный бант и красное платье."
  });
});

/* Страница Компота */
router.get('/kompot', function(req, res, next) {
  res.render('porsche', {
    title: "Компот",
    picture: "/images/kompot.png",
    desc: "Старший котёнок в семье. Ходит в школу. Очень любит грибы, читает про них энциклопедии. Любит игры на логику. Когда очень сильно огорчается, восклицает «Ну вот!» и начинает плакать. Обожает вкусно поесть. Носит зелёный костюм и шапку."
  });
});

module.exports = router;
