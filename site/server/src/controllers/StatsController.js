const sql = require('sqlite3')
const path = require('path')
const dbPath = path.join(__dirname, '../db/', 'footballStats.db')

module.exports = {
  async getTeamStats (req, res){
    try{
      let indexQuery = 'SELECT * '
      const columns = req.query.columns
      if(columns){
        indexQuery = addColumns(columns)
      }
      indexQuery = addTable(indexQuery, "teams")
      const sortby = req.query.sort
      if(sortby){
        indexQuery = addSortQuery(indexQuery, sortby)
      }
      sqlQuery(req, res, indexQuery, [])
    }catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'error returning top stats'
      })
    }
  }
}

function addSortQuery(query, sortBy){
  query += " ORDER BY " + sortBy
  console.log("Hello")
  return query
}

function addColumns(columns){
  console.log(typeof columns)
  query = "SELECT "
  if(typeof columns === 'string'){
    query += columns + " "
  }
  else{
    for(i = 0; i < columns.length; i++){
      query += columns[i]
      if(i != columns.length - 1){
        query += ", "
      }
      else{
        query += " "
      }
    }
  }
  return query
}

function addTable(query, table){
  query += "FROM " + table
  return query
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
