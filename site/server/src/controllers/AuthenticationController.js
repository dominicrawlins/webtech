const sql = require('sqlite3')

const path = require('path')
const dbPath = path.join(__dirname, '../db/', 'footballStats.db')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcrypt')

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
      bcrypt.hash(req.body.password, 10, function(err, hash){
        if(err){
          console.log(err)
        }
        const sqlQuery = 'INSERT INTO users (email, password) VALUES (?, ?)'
        const params =  [req.body.email, hash]
        db.run(sqlQuery, params, function (err) {
          if (err) {
            console.log('Error running sql ' + sql)
            console.log(err)
          } else {
            console.log(db)
            console.log("run database command")
          }
        })
        db.close()
      })
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
      const query = 'SELECT * FROM users WHERE email =  ?'
      const parameters = [req.body.email]
      db.all(query, parameters, (err, rows) => {
        if(err) {
          console.log('error running sql')
        }
        if(rows.length === 0) {
          //console.log('login invalid')
          res.status(403).send({
            error: 'The username was incorrect'
          })
        } else {
          bcrypt.compare(req.body.password, rows[0].password, (err, isMatch) => {
            if(err){
              res.status(403).send({
                error: 'Error'
              })
            }
            else if(isMatch){
              res.send({
                token: jwtSignUser(rows[0])

              })
            }
            else{
              res.status(403).send({
                error: 'Password incorrect'
              })
            }
          })
          //const userJson = rows.toJSON()
          //userJson = JSON.stringify(rows[0])

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
