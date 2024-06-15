const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class IngresosService {
  constructor() {}

  /*  */
  async find() {
    const response = await models.Ingresos.findAll();
    return response;
  }
  async findOne(id) {
    const ingreso = await models.Ingresos.findByPk(id);
    if (!ingreso) {
      throw boom.notFound('ingreso not found');
    }
    return ingreso;
  }
  async create(data) {
    const newIngreso = await models.Ingresos.create(data);
    return data;
  }

  async update(id, change) {
    const ingreso = await this.findOne(id);
    const rta = ingreso.update(change);
    return rta;
  }
  async delete(id) {
    const ingreso = await this.findOne(id);
    await ingreso.destroy();
    return { id };
  }
}
module.exports = IngresosService;

/* generate() {
    const limit = 20;
    for (let i = 0; i <= limit; i++) {
      this.categorias.push({
        id: faker.string.uuid(),
        nombre: faker.commerce.department(),
      });
    }
  } */
