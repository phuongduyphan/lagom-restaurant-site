const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const _ = require('lodash');
const key = require('./key');

const { Admin } = require('../models/admin/Admin');

const cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies)
  {
      token = req.cookies['jwt'];
  }
  return token;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = key.secretOrKey;

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Admin.query().where({ adminId: jwt_payload.adminId })
      .then((admins) => {
        if (!_.isEmpty(admins)) {
          return done(null, admins[0]);
        }
        return done(null, false);
      })
      .catch((err) => {
        console.log(err);
      })
  }));
};