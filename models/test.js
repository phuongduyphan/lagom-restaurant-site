const { Dish } = require('./dish/Dish');
const { User } = require('./user/User');
const { Admin } = require('./admin/Admin');
const bcrypt = require('bcryptjs');

function hashing(userpass) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(userpass, salt, (errHash, hash) => {
        if (errHash) return reject(errHash);
        return resolve(hash);
      });
    });
  });
}

async function runTest() {
  const hash = await hashing('2412');
  console.log(hash);
}

runTest().then(() => {});