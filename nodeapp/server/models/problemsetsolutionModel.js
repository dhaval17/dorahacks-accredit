var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var problemsetSolutionSchema = new Schema({
  emailToken: {type: String, required: true},
  problemSolution: {type: String, required: true},
  problemSet: {type: String, required: true}
});

module.exports = mongoose.model('problemsetSolution', problemsetSolutionSchema);