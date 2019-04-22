const sql = require('sqlite3')

const path = require('path')
const dbPath = path.join(__dirname, '../db/', 'footballStats.db')

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


  }
}
