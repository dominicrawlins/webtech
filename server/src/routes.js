AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
TeamsController = require('./controllers/TeamsController')
PlayersController = require('./controllers/PlayersController')

module.exports = (app) => {
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)

  app.get('/:team', PlayersController.index)

  app.get('/', TeamsController.index)


}
