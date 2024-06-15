const Joi = require('joi');

const id = Joi.string().uuid();
const nombre = Joi.string();
const descripcion = Joi.string();

const createCategoria = Joi.object({
  nombre: nombre.required(),
  descripcion: descripcion.allow(null).optional(),
});

const updateCategoria = Joi.object({
  nombre: nombre,
  descripcion: descripcion.allow(null).optional(),
});

const getCategoria = Joi.object({
  id: id.required(),
});

module.exports = { createCategoria, updateCategoria, getCategoria };
