const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class GastosService {
  constructor() {}

  async find() {
    const rta = await models.Gastos.findAll();
    return rta;
  }

  async findOne(id) {
    const gastos = await models.Gastos.findByPk(id);
    if (!gastos) {
      throw boom.notFound('Gastos not found');
    }
    return gastos;
  }

  async create(data) {
    const newGastos = await models.Gastos.create(data);
    return newGastos;
  }

  async update(id, change) {
    const gastos = await this.findOne(id);
    const rta = await gastos.update(change);
    return rta;
  }

  async delete(id) {
    const gastos = await this.findOne(id);
    await gastos.destroy();
    return { id };
  }
}

module.exports = GastosService;
