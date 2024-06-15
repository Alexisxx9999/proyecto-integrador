'use strict';
/* cuando ya tengas todos los modelos */
const { UserSchema, USER_TABLE, User } = require('../models/userModel');
const {
  ingresosSchema,
  INGRESOS_TABLE,
  Ingresos,
} = require('../models/ingresosModel');
const { gastosSchema, GASTOS_TABLE, Gastos } = require('../models/gastosModel');
const {
  categoriaSchema,
  CATEGORIAS_TABLE,
  Categorias,
} = require('../models/categoriasModel');
/* const { UserSchema, USER_TABLE, User } = require('../models/userModel'); */
/* de cada modelo */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CATEGORIAS_TABLE, categoriaSchema);
    await queryInterface.createTable(INGRESOS_TABLE, ingresosSchema);
    await queryInterface.createTable(GASTOS_TABLE, gastosSchema);
  },
  /* ejecutar , o crear  */

  async down(queryInterface, Sequelize) {
    /* para revertir cambios de up */
    await queryInterface.dropTable(INGRESOS_TABLE);
    await queryInterface.dropTable(GASTOS_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CATEGORIAS_TABLE);
  },
};
