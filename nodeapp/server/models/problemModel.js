var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var problemSchema = new Schema({
  skill: { type: String, required: true},
  question: {type: String, required: true},
  level: {type: String, required: true}
});

module.exports = mongoose.model('problem', problemSchema);