const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class CategoriasService {
  async find() {
    try {
      const categorias = await models.Categorias.findAll();
      return categorias;
    } catch (error) {
      throw boom.badImplementation('Error al buscar categorías', error);
    }
  }

  async findOne(id) {
    try {
      const categoria = await models.Categorias.findByPk(id);
      if (!categoria) {
        throw boom.notFound('Categoría no encontrada');
      }
      return categoria;
    } catch (error) {
      throw boom.badImplementation('Error al buscar categoría por ID', error);
    }
  }

  async create(data) {
    try {
      const newCategoria = await models.Categorias.create(data);
      return newCategoria;
    } catch (error) {
      throw boom.badImplementation('Error al crear nueva categoría', error);
    }
  }

  async update(id, change) {
    try {
      const categoria = await this.findOne(id);
      const updatedCategoria = await categoria.update(change);
      return updatedCategoria;
    } catch (error) {
      throw boom.badImplementation('Error al actualizar categoría', error);
    }
  }

  async delete(id) {
    try {
      const categoria = await this.findOne(id);
      await categoria.destroy();
      return { id };
    } catch (error) {
      throw boom.badImplementation('Error al eliminar categoría', error);
    }
  }
}

module.exports = CategoriasService;
