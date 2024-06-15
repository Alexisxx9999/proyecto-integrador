const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./userModel');
const { CATEGORIAS_TABLE } = require('./categoriasModel');

const INGRESOS_TABLE = 'ingresos';

const ingresosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  cantidad: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  descripcion: {
    allowNull: true,
    type: DataTypes.STRING,
  },

  fecha: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha',
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: ' SET NULL',
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CATEGORIAS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: ' SET NULL',
  },
};
class Ingresos extends Model {
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
      tableName: INGRESOS_TABLE,
      modelName: 'Ingresos',
      timestamps: false,
    };
  }
}
module.exports = { INGRESOS_TABLE, ingresosSchema, Ingresos };
