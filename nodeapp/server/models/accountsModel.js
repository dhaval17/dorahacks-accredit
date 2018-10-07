var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
  name: {type: String, required: true},
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true}, // Yeah I know I am stupid to save clear text password
  type: {type: String, required: true}
});

module.exports = mongoose.model('accounts', accountSchema);