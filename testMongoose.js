const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/testMongoose2024');
  const Cat = mongoose.model('Cat', { name: String });
  const kitty = new Cat({ name: 'Пушок' });
  await kitty.save();
  console.log('Мяу');
  await mongoose.disconnect();
}

main().catch(function(err) {
  console.error(err);
  process.exit(1);
});
