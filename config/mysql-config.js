const mysql = require('promise-mysql');
const fs = require('fs');

let dbMapper;
let apiMapper;

fs.readFile('./config/dbMapper.json', 'utf8', (err, data) => {
  if (err) throw err;
  dbMapper = JSON.parse(data);
});

fs.readFile('./config/apiMapper.json', 'utf8', (err, data) => {
  if (err) throw err;
  apiMapper = JSON.parse(data);
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