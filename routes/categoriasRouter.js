const express = require('express');
const categoriasService = require('../services/categoriasService');
const validator = require('../middlewares/validator');

const {
  createCategoria,
  updateCategoria,
  getCategoria,
} = require('../schemas/categoriasSchema');

const service = new categoriasService();
const router = express.Router();

router.get('/', async (req, res, next) => {
  const categorias = await service.find();
  res.json(categorias);
});

router.get(
  '/:id',
  validator(getCategoria, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const categoria = await service.findOne(id);
      res.json(categoria);
    } catch (error) {
      next(error);
    }
  },
);

router.post('/', validator(createCategoria, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newCategoria = await service.create(body);
    res.status(201).json(newCategoria);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validator(updateCategoria, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const categoria = await service.update(id, body);
      res.json(categoria);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
