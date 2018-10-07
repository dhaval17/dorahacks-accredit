var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  emailToken: {type: String, required: true},
  problemSet: {type: String, required: true},
  reviewScore: {type: Number, min: 1, max: 10, required: true},
  reviewer: {type: String, required: true}
});

module.exports = mongoose.model('review', reviewSchema);