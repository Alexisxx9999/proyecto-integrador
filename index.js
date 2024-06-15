const express = require('express');
const cors = require('cors');
const { checkApiKey } = require('./middlewares/auth');
const routerApi = require('./routes');
const app = express();

const port = process.env.PORT || 3000;
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormError,
} = require('./middlewares/error');

app.use(express.json());
const whitelist = ['htttp://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));
app.get('/', (req, res) => {
  res.send('Este es mi primer servidor');
});
app.get('/api/v1', checkApiKey, (req, res) => {
  res.send('api v1 esta listo');
});

routerApi(app);
/* middlewares despues del routing */
/* orden de ejecucion */
app.use(logErrors);
app.use(ormError); /* error orm */
app.use(boomErrorHandler);
app.use(errorHandler);
/*  */
app.listen(port, () => {
  console.log('se esta escuchando en el puerto', port);
});

/* api resful : en backend son servicios web  que se comunican
con el protocolo httpt : y este protocolo tienen varios verbos+
 que definen como queremos modificar o aterar cierta informacion

 get: obtener informacion
 post: para crear nuevos datos
  put: para modificar ciertos datos
  delete: para eliminar
  con esto hacemos todo un crud
*/
