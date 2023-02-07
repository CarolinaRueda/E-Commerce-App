const { DB } = require("../config");

const Pool = require("pg").Pool;

const pool = new Pool({
  user: DB.USER,
  host: DB.HOST,
  database: DB.NAME,
  password: DB.PASSWORD,
  port: DB.PORT,
});

module.exports = pool;
