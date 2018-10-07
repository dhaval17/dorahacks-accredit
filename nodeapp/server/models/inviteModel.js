var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inviteSchema = new Schema({
  company: {type: String, required: true},
  emailId: {type: String, required: true},
  problemSet: {type: String, required: true},
  emailToken: {type: String, required: true}
});

module.exports = mongoose.model('invite', inviteSchema);