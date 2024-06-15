const express = require('express');
const ProductService = require('../services/productService');
const validator = require('../middlewares/validator');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/productSchema');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
  /* aqui no va la ruta especifica solo lo dinamico */
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('yo soy un filter');
});

router.get(
  '/:id',
  validator(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.post('/', validator(createProductSchema, 'body'), async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});
router.patch(
  '/:id',
  validator(getProductSchema, 'params'),
  validator(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);

  res.json(rta);
});

module.exports = router;
