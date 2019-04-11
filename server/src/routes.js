AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
TeamsController = require('./controllers/TeamsController')
PlayersController = require('./controllers/PlayersController')

module.exports = (app) => {
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)

  app.get('/:team/players', PlayersController.index)

  app.get('/:team/stats', TeamsController.getTeam)

  app.get('/', TeamsController.index)

}
