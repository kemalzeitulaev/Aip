var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var porscheSchema = new Schema({
  title: String,
  nick: {
    type: String,
    unique: true,
    required: true
  },
  avatar: String,
  desc: String,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports.Porsche = mongoose.model("Porsche", porscheSchema, "porsche");
