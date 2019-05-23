AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
QueryController = require('./controllers/QueryController')


module.exports = (app) => {
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)

  app.post('/login',AuthenticationController.login)

  app.get('/stats/teams', QueryController.getTeamStats)

  app.get('/:team/players', QueryController.getTeamsPlayers)

  app.get('/:team/stats', QueryController.getTeam)

  app.get('/', QueryController.index)


}
