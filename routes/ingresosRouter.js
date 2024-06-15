const express = require('express');

const ingresosService = require('../services/ingresosService');
const service = new ingresosService();
const validator = require('../middlewares/validator');
const router = express.Router();

const {
  getIngresos,
  updateIngresos,
  createIngresos,
} = require('../schemas/ingresosSchema');

/* importaciones */

/* rutas con el objeto router */
router.get(
  '/',

  async (req, res, next) => {
    try {
      const gastos = await service.find();
      res.json(gastos);
    } catch (error) {
      next(error);
    }
  },
);
router.get('/:id', validator(getIngresos, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const ingreso = service.findOne(id);
    res.json(ingreso);
  } catch (error) {
    next(error);
  }
});
router.post(
  '/',
  /* aqui va el middleware de los roles  */
  validator(createIngresos, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const Newingreso = service.create(body);
      res.json(Newingreso);
    } catch (error) {
      next(error);
    }
  },
);
router.patch(
  '/:id',
  validator(updateIngresos, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const ingreso = await service.update(id, body);
      res.json(ingreso);
    } catch (error) {
      next(error);
    }
  },
);
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const ingreso = service.delete(id);
  res.json(ingreso).status(201);
});
module.exports = router;
