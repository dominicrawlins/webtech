const sql = require('sqlite3')
const path = require('path')
const dbPath = path.join(__dirname, '../db/', 'footballStats.db')

module.exports = {
  async index (req, res){
    let indexQuery = 'SELECT * FROM teams'
    sqlQuery(req, res, indexQuery, [])
  },


  async getTeam(req, res){
    let indexQuery = 'SELECT * FROM teams WHERE id = ?'
    let params = req.params.team
    sqlQuery(req, res, indexQuery, params)
  }
}

function sqlQuery(req, res, sqlQuery, params){
  try{
    let db = new sql.Database(dbPath, (err) => {
      if(err){
        console.error(err.message);
      }
    })

    db.all(sqlQuery, params, (err, result) => {
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
