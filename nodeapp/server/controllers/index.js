var fs = require('fs');
var credentials = JSON.parse(fs.readFileSync('/Users/dhavalchauhan/Desktop/Dorahacks/nodeapp/accounts.json', 'utf8'));
var crypto = require("crypto");
const sgMail = require('@sendgrid/mail');
var jwt = require('jsonwebtoken');

var accounts = require('../models/accountsModel');
var problemSet = require('../models/problemsetModel');
var invite = require('../models/inviteModel');
var problems = require('../models/problemModel');
var problemsetSolution = require('../models/problemsetsolutionModel');
var inviteReviewer = require('../models/inviteReviewerModel');
var review = require('../models/reviewModel')

sgMail.setApiKey("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");
var JWToken = process.env.JWToken;

module.exports = {
    index: (req, res) => {
      res.json({"title" : "Accredit"});
    },
    login: (req, res) => {
        var username, password, logintype;
        username = req.body.username;
        password = req.body.password;
        logintype = req.params.logintype;
        
        accounts
            .find({
                "username": username,
                "password": password,
                "type": logintype
            })
            .exec(function(err, loginResponse){
                if(err || loginResponse.length == 0) {
                    console.log(err);
                    res.status(400).json({
                        "success": 0,
                        "message": "Unable to validate credentials"
                    })
                    
                }
                else {
                    res.json({
                        "success": 1,
                        "token": jwt.sign({
                            "username": loginResponse[0].username,
                            "type": loginResponse[0].type
                        }, JWToken)
                    })
                }
            })
    },
    submitDetails: (req, res) => {
        var skill = req.body.skill, 
            budget = req.body.budget, 
            timeline = req.body.timeline, 
            level = req.body.level;
            ethAddress = req.body.ethAddress,
            problemsetId = 0;

        var newproblemSet = problemSet({
            company: req.user.username,
            skill: skill,
            budget: budget,
            timeline: timeline,
            level: level,
            ethAddress: ethAddress,
            amountDeposited: 0
        })
        newproblemSet.save(function(err, newproblemsetData){
            console.log(err + newproblemsetData);
            problemsetId = newproblemsetData._id;

            accounts
            .find({
                "type": "reviewer"
            })
            .exec(function(err, reviewerData){
                var formattedReviewer = reviewerData.map(reviewerObj => {
                    var rObj = {};
                    rObj['username'] = reviewerObj.username,
                    rObj['name'] = reviewerObj.name
                    return rObj;
                })
                res.json({
                    "problemsetId": problemsetId,
                    "skillReviewers": formattedReviewer
                })
            })
        })
    },
    sendInvites: (req, res) => {
        var problemSet = req.body.problemSet, name = req.body.name, emailId = req.body.email, emaillinkToken;
        emailToken = crypto.randomBytes(20).toString('hex');

        var newinvite = invite({
            company: req.user.username,
            emailId: emailId,
            problemSet: problemSet,
            emailToken: emailToken
        })

        newinvite.save(function(err, newinviteData){
            console.log(err + newinviteData)
        })

        const msg = {
            to: emailId,
            from: 'dhaval+dorahacks@dr4cun0.com',
            subject: 'You have received a invite',
            html: 'Click the link from '+ problemSet + ', Please proceed with :: <strong>'+ emailToken + '</strong>',
          };
          sgMail.send(msg);
          res.json({
              "success": 1,
              "message": "Invite Sent"
          })
    },
    viewproblemSet: (req, res) => {
        var emailToken = req.params.emailToken;
        invite
            .find({
                emailToken: emailToken
            })
            .exec(function(err, inviteData){
                console.log(err + inviteData)
                if(err || inviteData.length == 0) {
                    console.log(err);
                    res.status(500).json({
                        "error": 1,
                        "message": "Internal Server Error"
                    })
                }
                else {
                    //console.log(inviteData[0].problemSet)
                    problemSet
                        .findById(inviteData[0].problemSet, function(err, problemSetData){
                            if(err || problemSetData.length == 0) {
                                res.status(500).json({
                                    "error": 2,
                                    "message": "Internal Server Error"
                                })
                            }
                            else {
                                problems
                                .find({
                                    skill: problemSetData.skill,
                                    level: problemSetData.level
                                })
                                .exec(function(err, problemsData){
                                    if(err || problemsData.length == 0) {
                                        res.status(500).json({
                                            "error": 3,
                                            "message": "Internal Server Error"
                                        })
                                    }
                                    else {
                                        res.json({
                                            "success": 1,
                                            "question": problemsData[0].question,
                                            "problemSet": inviteData[0].problemSet
                                        })
                                    }
                                })
                            }
                        })
                }
            })
    },
    submitproblemsetSolution: (req, res) => {
        var emailToken = req.params.emailToken, 
            problemSolution = req.body.problemSolution,
            problemSet = req.body.problemSet;


        var newproblemsetSolution = new problemsetSolution({
            emailToken: emailToken,
            problemSolution: problemSolution,
            problemSet: problemSet
        })

        newproblemsetSolution.save(function(err, problemsetSolutionData){
            if(err) {
                console.log(err)
                res.status(500).json({
                    "error": 1,
                    "message": "Internal Server Error"
                })
            }
            else {
                res.json({
                    "success": 1,
                    "message": "Input Recorded"
                })
            }
        })
    },
    sendreviewerInvites: (req, res) => {
        var problemSet = req.body.problemSet,
            reviewerUsername = req.body.reviewerUsername;

        var newinviteReviewer = inviteReviewer({
            problemSet: problemSet,
            reviewerUsername: reviewerUsername
        })

        newinviteReviewer.save(function(err, newinvitereviewerData){
            console.log(err + newinvitereviewerData)
            if(err || newinvitereviewerData.length == 0) {
                res.json({
                    "error": 1,
                    "message": "Internal Server Error"
                })
            }
            else {
                res.json({
                    "success": 1,
                    "message": "Invite Sent"
                })
            }
        })
    },
    viewsolutionSet: (req, res) => {
        var reviewerUsername = req.user.username, question;
        inviteReviewer
            .find({
                reviewerUsername: reviewerUsername
            })
            .exec(function(err, inviteReviewerData){
                //console.log(err + inviteReviewerData)
                if(err || inviteReviewerData.length == 0) {
                    res.status(500).json({
                        "error": 1,
                        "message": "Internal Server Error"
                    })
                }
                else {
                    problemsetSolution
                        .find({
                            problemSet: inviteReviewerData[0].problemSet
                        })
                        .select("-_id -__v")
                        .exec(function(err, problemsetsolutionData){
                            problemSet
                                .findById(inviteReviewerData[0].problemSet, function(err, problemSetData){
                                    if(err || problemSetData.length == 0) {
                                        res.status(500).json({
                                            "error": 1,
                                            "message": "Internal Server Error"
                                        })
                                    }
                                    else {
                                        problems
                                            .find({
                                                "skill": problemSetData.skill,
                                                "level": problemSetData.level
                                            })
                                            .exec(function(err, problemsData){
                                                question = problemsData[0].question;
                                                res.json({
                                                    "question": question,
                                                    "solutions": problemsetsolutionData
                                                })
                                            })
                                    }
                                })
                        })
                }
            })
    },
    submitreviewsolutionSet: (req, res) => {
        var emailToken = req.body.emailToken,
            problemSet = req.body.problemSet,
            reviewScore = req.body.reviewScore
        var newreview = review({
            emailToken: emailToken,
            problemSet: problemSet,
            reviewScore: reviewScore,
            reviewer: req.user.username
        })
        newreview
            .save(function(err, reviewData){
                if(err || reviewData.length == 0) {
                    res.status(500).json({
                        "error": 1,
                        "message": "Internal Server Error"
                    })
                }
                else {
                    res.json({
                        "success": 1,
                        "message": "Inputs Recorded"
                    })
                }
            })
    }
  }