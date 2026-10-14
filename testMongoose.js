const mongoose = require('mongoose');
var Cat = require('./models/cat.js').Cat;

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/testMongoose2024');
  var cat = new Cat({
    title: "911",
    nick: "911"
  });
  await cat.save();
  console.log('saved', cat.nick);
  await mongoose.disconnect();
}

main().catch(function(err) {
  console.error(err);
  process.exit(1);
});
