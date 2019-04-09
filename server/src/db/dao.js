const sql = require('sqlite3');

module.exports = {

  async run(db, sql, params = []) {
    await db.run(sql, params, function (err) {
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
  },




  get(db, sql, params = [], response, res) {
  //  return new Promise((resolve, reject) => {
      db.get(sql, params, (err, result) => {
        if (err) {
          console.log("nah")
          console.log('Error running sql: ' + sql)
          console.log(err)
        //  reject(err)
        } else {
          console.log("got it")

          response = result
          console.log(response)
        //  resolve(result)
        }
//      })
      res.send(result)
    })
  }
}
