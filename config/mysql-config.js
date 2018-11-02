const mysql = require('promise-mysql');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

let dbMapper;
let apiMapper;
let schema;

const dbMapperPromise = fs.readFileAsync('./config/dbMapper.json');
const apiMapperPromise = fs.readFileAsync('./config/apiMapper.json', 'utf8');
const mysqlSchemaPromise = fs.readFileAsync('./config/mysqlSchema.json', 'utf8');

Promise.all([dbMapperPromise, apiMapperPromise, mysqlSchemaPromise]).then(results => {
  dbMapper = JSON.parse(results[0]);
  apiMapper = JSON.parse(results[1]);
  schema = JSON.parse(results[2]);
  module.exports.schema = schema;
});

function mapToObj(obj, mapper) {
  let returnObj = {};
  const objKeys = Object.keys(obj);
  objKeys.forEach((element) => {
    if (!mapper[element]) return;
    if (obj[element] !== Object(obj[element])) returnObj[mapper[element].value] = obj[element];
    else returnObj[mapper[element].value] = mapToObj(obj[element], mapper[element]);
  });
  return returnObj;
};

module.exports = {
  getConnection() {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'mis-restaurant'
    });
  },
  getDbObject(obj, category) {
    return mapToObj(obj, dbMapper[category]);
  },
  getAPIObject(obj, category) {
    return mapToObj(obj, apiMapper[category]);
  },
  category: {
    dish: 'dish',
    order: 'order',
    orderContains: 'orderContains',
    reservation: 'reservation',
    user: 'user'
  }
};