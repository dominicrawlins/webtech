const sql = require('sqlite3')

const path = require('path')
const dbPath = path.join(__dirname, '../db/', 'footballStats.db')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res){
    try{
      let db = new sql.Database(dbPath, (err) => {
        if(err){
          console.error(err.message);
        }
      })
      const sqlQuery = 'INSERT INTO users (email, password) VALUES (?, ?)'
      const params =  [req.body.email, req.body.password]
      db.run(sqlQuery, params, function (err) {
        if (err) {
          console.log('Error running sql ' + sql)
          console.log(err)
          //reject(err)
        } else {
          console.log(db)
          console.log("run database command")
          //resolve({ id: this.lastID })
        }
      })

      res.send("woo")
      db.close()
    } catch(err){
      res.status(400).send({
        error: err.message
      })
    }


  },
  async login (req,res) {
    try{
      let db = new sql.Database(dbPath, (err) => {
        if(err){
          console.error(err.message);
        }
      })
      const query = 'SELECT * FROM users WHERE (email, password) = (?, ?)'
      const parameters = [req.body.email, req.body.password]
      db.all(query, parameters, (err, rows) => {
        if(err) {
          console.log('error running sql')
        }
        // console.log(rows);
        const allEmails = rows.map(e => e.email);
        const allPasswords = rows.map(p => p.password)
        //console.log(allEmails)
        //console.log(allPasswords)
        if(allEmails.length === 0) {
          //console.log('login invalid')
          res.status(403).send({
            error: 'The login information was incorrect'
          })
        } else {
          //const userJson = rows.toJSON()
          //userJson = JSON.stringify(rows[0])
          res.send({
            token: jwtSignUser(rows[0])

          })
        }
      })
      db.close()
    } catch(err) {
      res.status(500).send({
        error: 'There was an error trying to login'
      })
    }
  }
}
