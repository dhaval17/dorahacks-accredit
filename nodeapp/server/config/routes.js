var controllers = require('../controllers');

var authenticate = require('../helper/authenticateHelper')
module.exports = (app) => {
    app.get('/', controllers.index);
    app.post('/login/:logintype', controllers.login)
    app.post('/company/submitDetails', authenticate.authenticateUser, controllers.submitDetails)
    app.post('/company/sendInvite', authenticate.authenticateUser, controllers.sendInvites)
    app.post('/company/sendreviewerInvite', authenticate.authenticateUser, controllers.sendreviewerInvites)
    app.get('/user/viewproblemSet/:emailToken', controllers.viewproblemSet)
    app.post('/user/submitproblemSet/:emailToken', controllers.submitproblemsetSolution)
    app.post('/reviewer/viewsolutionSet/', authenticate.authenticateUser, controllers.viewsolutionSet)
    app.post('/reviewer/submitreviewsolutionSet/', authenticate.authenticateUser, controllers.submitreviewsolutionSet)
}