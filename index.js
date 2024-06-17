// index.js
const express = require('express');
const path = require('path');
const { create } = require('express-handlebars');
const routerApi = require('./routes');
const passport = require('passport');
const cors = require('cors');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormError,
} = require('./middlewares/error');
const { checkApiKey } = require('./middlewares/auth');

const app = express();
const port = process.env.PORT || 3000;

// Configura Handlebars
const hbs = create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Configuración de CORS
/* const whitelist = ['http://localhost:8080', 'http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
 */
app.use(cors());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
require('./utils/auth'); // Importa configuración de passport
app.use(passport.initialize());
// Rutas para vistas
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// Importa y usa authRouter
const authRouter = require('./routes/authRouter');
app.use('/auth', authRouter);

// API Routes
routerApi(app);

app.use(logErrors);
app.use(ormError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('se esta escuchando en el puerto', port);
});
