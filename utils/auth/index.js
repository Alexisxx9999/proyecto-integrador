const passport = require('passport');
const LocalStrategy = require('./strategies/local-strategies');
/* more strategies */
passport.use(LocalStrategy);
