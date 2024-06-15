const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const UserService = require('../../../services/userService.');
const bcrypt = require('bcrypt');
const service = new UserService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'contraseña',
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.contraseña);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.contraseña;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  },
);

module.exports = LocalStrategy;
