var express = require('express');
var router = express.Router();

var site = 'https://kemalzeitulaev.github.io/Aip';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Porsche' });
});

/* Страница 911 */
router.get('/911', function(req, res, next) {
  res.render('model', {
    title: '911',
    eyebrow: 'Икона',
    picture: '/images/911.jpg',
    desc: 'Силуэт 1963 года, который до сих пор задаёт тон. Задний мотор, посадка «как в перчатке» и характер на любой дороге.',
    page: site + '/911.html'
  });
});

/* Страница GT3 RS */
router.get('/gt3', function(req, res, next) {
  res.render('model', {
    title: 'GT3 RS',
    eyebrow: 'Motorsport',
    picture: '/images/gt3.jpg',
    desc: 'Антикрыло, воздух и круги. Это уже не про комфорт — про то, как далеко можно зайти, оставаясь на номерах.',
    page: site + '/gt3.html'
  });
});

/* Страница Taycan */
router.get('/taycan', function(req, res, next) {
  res.render('model', {
    title: 'Taycan',
    eyebrow: 'Electric',
    picture: '/images/taycan.jpg',
    desc: 'Низкий, быстрый, с мгновенной тягой. Доказательство, что будущее тоже может звучать по-поршевски.',
    page: site + '/taycan.html'
  });
});

module.exports = router;
