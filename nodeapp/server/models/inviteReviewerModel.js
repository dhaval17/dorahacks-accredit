var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inviteReviewerSchema = new Schema({
  problemSet: {type: String, required: true},
  reviewerUsername: {type: String, required: true}
});

module.exports = mongoose.model('inviteReviewer', inviteReviewerSchema);