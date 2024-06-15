const Joi = require('joi');

const id = Joi.number().integer();
const descripcion = Joi.string();
const cantidad = Joi.number().required();
const fecha = Joi.date().required();
const usuarioId = Joi.number().integer().required();
const categoriaId = Joi.number().integer().required();

const createGastos = Joi.object({
  descripcion: descripcion,
  cantidad: cantidad,
  fecha: fecha,
  usuarioId: usuarioId,
  categoriaId: categoriaId,
});

const updateGastos = Joi.object({
  descripcion: descripcion.optional(),
  cantidad: cantidad.optional(),
  fecha: fecha.optional(),
  usuarioId: usuarioId.optional(),
  categoriaId: categoriaId.optional(),
});

const getGastos = Joi.object({
  id: id.required(),
});

module.exports = { createGastos, updateGastos, getGastos };
