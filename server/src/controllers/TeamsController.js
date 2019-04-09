const {Team} = require('../models')
const dao = require('../db/dao.js')
const sql = require('sqlite3')
const path = require('path')
const dbPath = path.join(__dirname, '../db/', 'footballStats.db')

module.exports = {
  async index (req, res){
    try{
      let db = new sql.Database(dbPath, (err) => {
        if(err){
          console.error(err.message);
        }
      })
      const sqlQuery = 'SELECT * FROM teams';
      db.all(sqlQuery, [], (err, result) => {
        if (err) {
          console.log("nah")
          console.log('Error running sql: ' + sql)
          console.log(err)
        //  reject(err)
        } else {
          console.log("got it")

          res.send(result)
        //  resolve(result)
        }
//      })
    })
      db.close();
    } catch(err){
      res.status(400).send({
        error: err.message
      })
    }


  }
}
