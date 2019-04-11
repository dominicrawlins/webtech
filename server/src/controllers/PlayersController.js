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
      const team = req.params.team
      const sqlQuery = 'SELECT * FROM players WHERE team = ?;'
      db.all(sqlQuery, [team], (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
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
