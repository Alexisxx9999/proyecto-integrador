const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const UserService = require('../services/userService.');
const bcrypt = require('bcrypt');
const { createUserSchema } = require('../schemas/userSchema');
const validator = require('../middlewares/validator');
const router = express.Router();

const service = new UserService();
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecret);

    res.redirect('/api/v1/dashboard'); // Redirigir al dashboard después del login
  },
);

router.post(
  '/register',
  validator(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;

      const newUser = await service.create(body);
      // Redirigir al usuario al login después del registro exitoso
      res.redirect('/login');
    } catch (error) {
      next(error); // Pasar el error al siguiente middleware de manejo de errores
    }
  },
);

router.get('/logout', (req, res) => {
  req.logout; // Este método es proporcionado por Passport para limpiar la sesión
  res.clearCookie('jwt'); // Elimina la cookie de JWT si la tienes configurada
  res.redirect('/login'); // Redirige al login después del logout
});

module.exports = router;
