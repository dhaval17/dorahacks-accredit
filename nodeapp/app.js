const app = require('express')();
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/accredit');

require('./server/config/express')(app);
require('./server/config/routes')(app);