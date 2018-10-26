const mysql = require('promise-mysql');

module.exports = {
  getConnection() {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'mis-restaurant'
    }); 
  }
};