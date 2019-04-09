const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {sequelize} = require('./models');
const config = require('./config/config');
const sql = require('sqlite3');
const dao = require('./db/dao.js');

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


const createTableSQL = 'CREATE TABLE IF NOT EXISTS users (email STRING PRIMARY KEY, password STRING)';
dao.run(db, createTableSQL);
console.log("created users table");

db.close();

app.listen(config.port);
console.log('Server started on port ' + config.port);
