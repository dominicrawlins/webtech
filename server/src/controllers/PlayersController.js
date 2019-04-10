const sql = require('sqlite3')
const path = require('path')
const dbPath = path.join(__dirname, '../db/', 'footballStats.db')

module.exports = {
  async index (req, res, team){
    try{
      let db = new sql.Database(dbPath, (err) => {
        if(err){
          console.error(err.message);
        }
      })
      const team = req.params.team
      db.get('SELECT id FROM teams WHERE name = ?;', team, (err, result) => {
        if(err){
          console.log(err)
        } else{
          const id = result.id

          console.log(id)

          const sqlQuery = 'SELECT * FROM players WHERE team = ?;'
          db.all(sqlQuery, [id], (err, result) => {
            if (err) {
              console.log("nah")
              console.log('Error running sql: ' + sql)
              console.log(err)
            //  reject(err)
            } else {
              console.log("got it")
              console.log(result)

              res.send(result)
            //  resolve(result)
            }
    //      })
        })
        }
      })





      db.close();
    } catch(err){
      res.status(400).send({
        error: err.message
      })
    }


  }
}
