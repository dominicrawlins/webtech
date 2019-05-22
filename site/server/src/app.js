const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const sql = require('sqlite3');
const https = require('https');
const fs = require('fs');

const app= express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app)


const path = require('path')
const dbPath = path.join(__dirname, 'db/', 'footballStats.db')
let db = new sql.Database(dbPath, (err) => {
  if(err){
    console.error(err.message);
  }
  else{
    console.log('Connected to database');
  }
});

const sqlQuery = 'CREATE TABLE IF NOT EXISTS users (email STRING PRIMARY KEY, password STRING)';
const params =  []
db.run(sqlQuery, [], function (err) {
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

console.log("created users table");

db.close();

const keyPath = path.join(__dirname, 'server.key')
const certPath = path.join(__dirname, 'server.crt')
/*https.createServer({key: fs.readFileSync(keyPath, 'utf8'),
                    cert: fs.readFileSync(certPath, 'utf8'),
                    passphrase: 'pass',
                    requestCert: false,
                    rejectUnauthorized: false}, app).listen(8080);*/
app.listen(8080)
console.log("running on port:"+config.port)
