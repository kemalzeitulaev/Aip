var Cat = require('../models/cat').Cat;

module.exports = async function(req, res, next) {
  res.locals.nav = [];
  try {
    var menu = await Cat.find({}, { _id: 0, title: 1, nick: 1 });
    console.log(menu);
    if (menu.length != 0) {
      res.locals.nav = menu;
    }
    next();
  } catch (err) {
    next(err);
  }
};
