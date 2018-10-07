var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var problemsetSchema = new Schema({
  company: {type: String, required: true},
  skill: {type: String, required: true},
  budget: { type: Number, required: true},
  timeline: {type: Number, min: 0, max: 1, required: true},
  level: {type: Number, min: 0, max: 2, required: true},
  ethAddress: {type: String, required: true},
  amountDeposited: {type: Boolean, required: true}
});

module.exports = mongoose.model('problemSet', problemsetSchema);