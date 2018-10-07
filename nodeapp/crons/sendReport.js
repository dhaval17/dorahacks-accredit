const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey("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");
mongoose.connect('mongodb://localhost/accredit', { useNewUrlParser: true });

var review = require('../server/models/reviewModel')

const CONSTPROBLEMSET = '5bb949f8c31616e685a85033';
const CONSTEMAILTOKENA = '63416a80e9826a50d73e3e1df6b48ddfa790065a'
const CONSTEMAILTOKENB = 'dffbd690cc8812712dc8f90e1267701deac4c457'

var candidateA, candidateB, HTMLemail;

review
    .find({
        problemSet: CONSTPROBLEMSET,
        emailToken: CONSTEMAILTOKENA
    })
    .exec(function(err, reviewDataA){
        review
            .find({
                problemSet: CONSTPROBLEMSET,
                emailToken: CONSTEMAILTOKENB
            })
            .exec(function(err, reviewDataB){
                candidateA = (reviewDataA[0].reviewScore + reviewDataA[1].reviewScore)/2;
                candidateB = (reviewDataB[0].reviewScore + reviewDataB[1].reviewScore)/2;

                const msg = {
                    to: 'dhaval+company@dr4cun0.com',
                    from: 'dhaval+dorahacks@dr4cun0.com',
                    subject: 'Report Generated',
                    html: '<h2>Review Report</h2><br/><h3>Score</h3><br/><h4>Candidate A :: </h4><strong><h4>' + candidateA + '</h4></strong><br/><h4>Candidate B :: </h4><strong><h4>' + candidateB + '<h4></strong>',
                  };
                sgMail.send(msg);
            })
    })