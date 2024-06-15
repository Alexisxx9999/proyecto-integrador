const passport = require('passport');
const LocalStrategy = require('./strategies/local-strategies');
const JwtStrategy = require('./strategies/jwt-strategy');
/* more strategies */
passport.use(LocalStrategy);
passport.use(JwtStrategy);
