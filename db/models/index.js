/* se encarga de enviar la conexion hacia los modelos y permitira la visualizacion de datos */
/* setup inicial de sequelize con los modelos */

const { User, UserSchema } = require('./userModel');
const { Categorias, categoriaSchema } = require('./categoriasModel');
const { Ingresos, ingresosSchema } = require('./ingresosModel');
const { Gastos, gastosSchema } = require('./gastosModel');

/* despues todos los modelos las importaciones */
/* llamamos a un metodo sin necesidad de una instancia */

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Ingresos.init(ingresosSchema, Ingresos.config(sequelize));
  Categorias.init(categoriaSchema, Categorias.config(sequelize));

  Gastos.init(gastosSchema, Gastos.config(sequelize));
  /* aqui todos los modelos */
  User.associate(sequelize.models);
  Categorias.associate(sequelize.models);
  Gastos.associate(sequelize.models);

  Ingresos.associate(sequelize.models);

  /* ESTO RESULEVE LA LOGICA PERO NO EL CAMPO */
}
module.exports = setupModels;
