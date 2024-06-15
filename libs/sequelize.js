const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
/* INSTANCIA */
const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: (msg) => console.log(msg),
});
setupModels(sequelize);
module.exports = sequelize;
/* sequelize.sync(); */ /* va a crear la estructura de la base */
/* va a crear la tabla de manera dinamica */

/* no es recomendable para usar en produccion */
/*recuerda cuando creaste una nueva tabla en el modelo no se actualizo esos cambios
 asi que para hacerlo toco eliminar la bd y correr de nuevo para crear todo desde cero
 entonces para ello usamos migraciones */
