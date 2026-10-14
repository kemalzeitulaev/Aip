var express = require('express');
var router = express.Router();

/* GET cats listing. */
router.get('/', function(req, res, next) {
  res.send('Новый маршрутизатор, для маршрутов, начинающихся с cats');
});

/* Страница модели */
router.get('/:nick', function(req, res, next) {
  res.send(req.params.nick);
});

module.exports = router;
