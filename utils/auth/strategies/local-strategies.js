// localStrategy.js

const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UserService = require('../../../services/userService.');

const service = new UserService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'email', // Campo del formulario para el correo electrónico
    passwordField: 'contraseña', // Campo del formulario para la contraseña
  },
  async (email, contraseña, done) => {
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        return done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(contraseña, user.contraseña);
      if (!isMatch) {
        return done(boom.unauthorized(), false);
      }
      delete user.dataValues.contraseña; // Eliminar la contraseña antes de devolver al usuario
      return done(null, user); // Autenticación exitosa, devolver el usuario
    } catch (error) {
      return done(error, false); // Error durante la autenticación
    }
  },
);

module.exports = LocalStrategy;
