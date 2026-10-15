const mongoose = require('mongoose');
var Porsche = require('./models/porsche.js').Porsche;

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/testMongoose2024');
  var car = new Porsche({
    title: "911",
    nick: "911"
  });
  await car.save();
  console.log('saved', car.nick);
  await mongoose.disconnect();
}

main().catch(function(err) {
  console.error(err);
  process.exit(1);
});
