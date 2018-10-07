const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/accredit');

var accounts = require('../server/models/accountsModel');

var company = new accounts({
    "name": "Awesome Company",
    "username": "awesome",
    "password": "letmein",
    "type": "company"
})

company.save(function(err, data){
    console.log(err + data);
})

var reviewerA = new accounts({
    "name": "Dope Reviewer",
    "username": "dope",
    "password": "letmein",
    "type": "reviewer"
})

reviewerA.save(function(err, data){
    console.log(err + data);
})

var reviewerB = new accounts({
    "name": "Dank Reviewer",
    "username": "dank",
    "password": "letmein",
    "type": "reviewer"
})

reviewerB.save(function(err, data){
    console.log(err + data);
})
