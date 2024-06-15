const express = require('express');
const productsRouter = require(`./productsRouter`);
const usersRouter = require(`./usersRouter`);
const ingresosRouter = require(`./ingresosRouter`);
const gastosRouter = require(`./gastosRouter`);
const categoriasRouter = require(`./categoriasRouter`);

const router = express.Router();
function routerApi(app) {
  app.use('/api/v1/', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/ingresos', ingresosRouter);
  router.use('/gastos', gastosRouter);
  router.use('/categorias', categoriasRouter);
}

module.exports = routerApi;
