const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const { Admin } = require('../models/admin/Admin');
const key = require('../config/key');

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

function comparing(candidatePassword, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if (err) return reject(err);
      return resolve(isMatch);
    });
  });
}

router.post('/register', async function(req, res, next) {
  try {
    const { admin } = req.body;
    const { secretCode } = req.body;
    if (secretCode !== key.secretCode) {
      return res.sendStatus(401);
    };

    admin.password = await hashing(admin.password);
    await Admin.query().insert(admin);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async function(req, res, next) {
  try {
    const { admin } = req.body;

    const listOfAdmins = await Admin.query().where({ username: admin.username });
    if (_.isEmpty(listOfAdmins)) {
      return res.sendStatus(404);
    }
    
    const recvAdmin = listOfAdmins[0];
    const isMatch = await comparing(admin.password, recvAdmin.password);
    
    if (isMatch) {
      delete recvAdmin.password;
      const payload = JSON.parse(JSON.stringify(recvAdmin));

      const token = jwt.sign(payload, key.secretOrKey, {
        expiresIn: '3d',
      });
      
      res.cookie('jwt', token);
      res.send({
        success: true,
        token
      });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
