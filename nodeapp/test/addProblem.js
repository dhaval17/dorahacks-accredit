const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/accredit');

var problems = require('../server/models/problemModel');

var problemA = new problems({
    skill: "swift",
    question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    level: 1
})

problemA.save(function(err, data){
    console.log(err + data);
})

var problemB = new problems({
    skill: "swift",
    question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    level: 2
})

problemB.save(function(err, data){
    console.log(err + data);
})

var problemC = new problems({
    skill: "swift",
    question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    level: 3
})

problemC.save(function(err, data){
    console.log(err + data);
})