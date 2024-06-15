const { DataTypes, Model, Sequelize } = require('sequelize');
const CATEGORIAS_TABLE = 'categorias';

const categoriaSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

class Categorias extends Model {
  static associate(models) {
    this.hasMany(models.Gastos, { as: 'gastos', foreignKey: 'categoriaId' });
    this.hasMany(models.Ingresos, {
      as: 'ingresos',
      foreignKey: 'categoriaId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIAS_TABLE,
      modelName: 'Categorias',
      timestamps: false,
    };
  }
}

module.exports = { Categorias, categoriaSchema, CATEGORIAS_TABLE };
