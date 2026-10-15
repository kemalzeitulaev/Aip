var express = require('express');
var router = express.Router();

/* GET porsche listing. */
router.get('/', function(req, res, next) {
  res.send('Новый маршрутизатор, для маршрутов, начинающихся с porsche');
});

/* Страница модели */
router.get('/:nick', function(req, res, next) {
  res.send(req.params.nick);
});

module.exports = router;
