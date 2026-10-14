const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/testMongoose2024');
  var schema = mongoose.Schema({ name: String });
  schema.methods.meow = function() {
    console.log(this.name + " сказал мяу");
  };
  const Cat = mongoose.model('Cat', schema);
  const kitty = new Cat({ name: 'Пушок' });
  await kitty.save();
  kitty.meow();
  await mongoose.disconnect();
}

main().catch(function(err) {
  console.error(err);
  process.exit(1);
});
