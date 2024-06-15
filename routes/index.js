const express = require('express');
const passport = require('passport');

/* const productsRouter = require(`./productsRouter`); */
const usersRouter = require(`./usersRouter`);
const ingresosRouter = require(`./ingresosRouter`);
const gastosRouter = require(`./gastosRouter`);
const categoriasRouter = require(`./categoriasRouter`);
const authRouter = require(`./authRouter`);

const router = express.Router();
function routerApi(app) {
  app.use('/api/v1/', router);
  /* router.use('/products', productsRouter); */
  router.use(
    '/users',
    passport.authenticate('jwt', { session: false }),
    usersRouter,
  );
  router.use(
    '/ingresos',
    passport.authenticate('jwt', { session: false }),
    ingresosRouter,
  );
  router.use(
    '/gastos',
    passport.authenticate('jwt', { session: false }),
    gastosRouter,
  );
  router.use(
    '/categorias',
    passport.authenticate('jwt', { session: false }),
    categoriasRouter,
  );
  router.use('/auth', authRouter);
}

module.exports = routerApi;
