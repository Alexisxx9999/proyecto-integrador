const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./userModel');
const { CATEGORIAS_TABLE } = require('./categoriasModel');

const GASTOS_TABLE = 'gastos';

const gastosSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  cantidad: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  descripcion: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CATEGORIAS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Gastos extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'usuarioId' });
    this.belongsTo(models.Categorias, {
      as: 'categorias',
      foreignKey: 'categoriaId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GASTOS_TABLE,
      modelName: 'Gastos',
      timestamps: false,
    };
  }
}

module.exports = { GASTOS_TABLE, gastosSchema, Gastos };
