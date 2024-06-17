const passport = require('passport');
const LocalStrategy = require('./strategies/local-strategies');
const JwtStrategy = require('./strategies/jwt-strategy');
const UserService = require('../../services/userService.');

const service = new UserService();

passport.use(LocalStrategy);
passport.use(JwtStrategy);

module.exports = passport;
