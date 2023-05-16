var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const basicAuthMiddleware = require('./lib/basicAuthMiddleware');
const i18n = require('./lib/i18nConfigure');
const LoginController = require('./controllers/LoginController');
const PrivadoController = require('./controllers/PrivadoController');
const session = require('express-session');
const sessionAuth = require('./lib/sessionAuthMiddleware');
const MongoStore = require('connect-mongo');

require('./lib/connectMongoose'); // Para que arranque la librería del Mongoose y se conecte con Mongoose a la BD

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//__dirname devuelve la ruta completa hasta donde está __dirname
app.set('view engine', 'ejs');
app.set('x-powered-by', false);

app.locals.title = 'NodeApp';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*Esto  lo pongo yo
app.use('/prueba', (req, res, next) => {
  console.log('Llegó una petición a /prueba');
  next();
  //res.send('Lo que sea')
})
*/

/**
 * Rutas del API
 */
app.use('/api/agentes', basicAuthMiddleware, require('./routes/api/agentes'));

app.use(i18n.init); //Middleware para integrar i18n en xpress. Si queremos que lea la cookie, debe de estar después del Midleware de la cookie.
app.use(
    session({
        name: 'nodeapp-session',
        secret: 'as78dbas8d7bva6sd6vas',
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 2, // expira a los 2 días de inactividad
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_CONNECTION_STR,
        }),
    })
);

const loginController = new LoginController(); //Creamos instancia de LoginController
const privadoController = new PrivadoController();

/**
 * Rutas del Website
 */
// Hacemos que el objeto de sesión esté disponible al renderizar vistas
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
app.use('/', require('./routes/home'));
app.use('/users', require('./routes/users'));
app.use('/features', require('./routes/features'));
app.use('/change-locale', require('./routes/change-locale'));
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);
app.get('/privado', sessionAuth, privadoController.index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    /*const error = new Error('Error fatal');
  error.status = 401;
  next();*/
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // comprobar si es un error de validación
    if (err.array) {
        // const errorInfo = err.array({ onlyFirstError: true })[0];
        const errorInfo = err.errors[0];
        err.message = `Error en ${errorInfo.location}, parámetro ${errorInfo.param} ${errorInfo.msg}`;
        err.status = 422;
    }

    res.status(err.status || 500);

    /*Si lo que ha fallado es una petición al API
  devuelvo el error en formato JSON */
    //console.log(originalUrl)

    if (req.originalUrl.startsWith('/api/')) {
        res.json({ error: err.message });
        return;
    }

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.render('error');
});

module.exports = app;
