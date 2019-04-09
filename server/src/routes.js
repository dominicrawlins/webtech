AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
TeamsController = require('./controllers/TeamsController')

module.exports = (app) => {
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)

  app.get('/', TeamsController.index)
}
