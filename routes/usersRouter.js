const express = require('express');
const userService = require('../services/userService.');
const validator = require('../middlewares/validator');

const {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
} = require('../schemas/userSchema');
/* importaciones de modulos o clases de otras carpetas de aqui hacia arriba */
const service = new userService();
const router = express.Router();

router.get('/', async (req, res, next) => {
  const users = await service.find();
  res.json(users);
});
router.get(
  '/:id',
  validator(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);
router.post(
  '/',
  validator(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);
/* router.put('/:id', (req, res) => {
  const { body } = req.params;
  res.json({
    message: ' usuario actualizadp',
    data: body,
  });
}); */
router.patch(
  '/:id',
  validator(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
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
