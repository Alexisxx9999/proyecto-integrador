const express = require('express');
const passport = require('passport');

const GastosService = require('../services/gastosService');
const validator = require('../middlewares/validator');

const {
  getGastos,
  createGastos,
  updateGastos,
} = require('../schemas/gastosSchema');

const router = express.Router();
const service = new GastosService();

router.get('/', async (req, res, next) => {
  try {
    const gastos = await service.find();
    res.json(gastos);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validator(getGastos, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const gastos = await service.findOne(id);
    res.json(gastos);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  validator(createGastos, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newGasto = await service.create(body);
      res.status(201).json(newGasto);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validator(getGastos, 'params'),
  validator(updateGastos, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const gastos = await service.update(id, body);
      res.json(gastos);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validator(getGastos, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
