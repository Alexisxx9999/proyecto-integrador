const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/', validator(createCategoria, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newCategoria = await service.create(body);
    res.status(201).json(newCategoria);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
