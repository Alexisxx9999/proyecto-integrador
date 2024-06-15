/* utilizacion de la librearia join para validar campos */
const Joi = require('joi');
const id = Joi.number().integer();
const nombre = Joi.string().min(5).max(50);
const email = Joi.string().email();
const contraseña = Joi.string().min(6).max(10);

const createUserSchema = Joi.object({
  nombre: nombre.required(),
  email: email.required(),
  contraseña: contraseña.required(),
});
const updateUserSchema = Joi.object({
  nombre: nombre,
  contraseña: contraseña,
  email: email,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
