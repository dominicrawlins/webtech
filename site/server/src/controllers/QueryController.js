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
        indexQuery = addSortQuery(indexQuery, sortby, req.query.order)
      }
      sqlQuery(req, res, indexQuery, [])
    }catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'error returning top stats'
      })
    }
  },
  async getTeamsPlayers(req, res){
    try{
      const team = req.params.team
      const query = 'SELECT * FROM players WHERE team = ?;'
      sqlQuery(req, res, query, team)
    } catch(err){
      res.status(500).send({
        error: err.message
      })
    }
  },
  async getPlayerStats(req, res){
    try{
      let params=[]
      let indexQuery = 'SELECT * '
      const columns = req.query.columns
      if(columns){
        indexQuery = addColumns(columns)
      }
      indexQuery = addTable(indexQuery, "players")
      const team = req.query.team
      if(team){
        indexQuery += ' WHERE team = ? '
        params.push(team)
      }
      const sortby = req.query.sort
      if(sortby){
        indexQuery = addSortQuery(indexQuery, sortby, req.query.order)
      }
      const topNumber = req.query.top
      if(topNumber){
        indexQuery += ' LIMIT ' + topNumber
      }
      console.log(indexQuery)
      sqlQuery(req, res, indexQuery, params)
    }catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'error returning top stats'
      })
    }
  },
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

function addSortQuery(query, sortBy, order){
  query += " ORDER BY " + sortBy
  if(order){
    query += + " " + order
  }
  return query
}

function addColumns(columns){
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
    console.log(sqlQuery)

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
