var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(morgan('combined'));
    app.listen(1711, function(){
        console.log("Engine started on Port 1711 at " + Date.now())
      });
}