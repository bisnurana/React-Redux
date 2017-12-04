const passport = require('passport');
const User = require('../models/user');
const keys = require('../config/keys');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local');
//set local strategy
const localLogin = new localStrategy({ usernameField: 'email' }, function(
  email,
  password,
  done
) {
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
});
//set options for jwt
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: keys.jwtSecretKey
};
//set up jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  //look for user with their current id
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, fase);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

//use strategy
passport.use(jwtLogin);
passport.use(localLogin);
