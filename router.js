const authCtrl = require('./controllers/authCtrl');
const passport = require('passport');
const passportService = require('./services/passport');
//middleware interceptor for authentication
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
// handle authentication routes

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ Hi: 'there' });
  });
  app.post('/signin', requireSignin, authCtrl.signin);
  app.post('/signup', authCtrl.signup);
};
