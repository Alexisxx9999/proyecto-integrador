const boom = require('@hapi/boom');
const { config } = require('../config/config');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apikey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}
/* rol de admin */
function checkAdminRole(req, res, next) {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}
router.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
});

router.get('/protected-route', (req, res) => {
  res.json({
    message: 'You have access to this protected route',
    user: req.user,
  });
});

/* otros roles */
function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;

    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

module.exports = { checkApiKey, router }; /* importa esas funciones de reoles */
