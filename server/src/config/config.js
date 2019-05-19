module.exports = {
  port: process.env.PORT || 8080,
  db: {
    database: process.env.DB_NAME || 'footballStats',
    user: process.env.DB_USER || 'footballStats',
    password: process.env.DB_PASS || 'footballStats',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './footballStats.sqlite'
    }
  },
  authentication: {
    jwtSecret : process.env.JWT_SECRET || 'secret'
  }
}
