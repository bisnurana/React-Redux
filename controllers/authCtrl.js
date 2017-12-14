const jwt = require('jwt-simple');
const keys = require('../config/keys');
const User = require('../models/user');

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, keys.jwtSecretKey);
}
exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
};
exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  //filter blank fields
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide an email and password' });
  }
  //look for users
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    //already a user
    if (existingUser) {
      return res.status(422).send({ error: 'Email already in use' });
    }
    //create new user
    const user = new User({ email: email, password: password });
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      // response to the user
      res.json({ token: tokenForUser(user) });
    });
  });
};
