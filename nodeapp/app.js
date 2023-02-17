var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const basicAuthMiddleware = require('./lib/basicAuthMiddleware')

require('./lib/connectMongoose'); // Para que arranque la librería del Mongoose y se conecte con Mongoose a la BD

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //Une dos strings que forman una ruta al sistema de ficheros según el sistema Operativo
                          //__dirname devuelve la ruta completa hasta donde está __dirname
app.set('view engine', 'ejs');
app.set('x-powered-by', false);

app.locals.title = 'NodeApp'

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  //parsea url body
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
 * Rutas del Api
 */
app.use('/api/agentes', basicAuthMiddleware, require('./routes/api/agentes'));

/**
 * Rutas del website
 */
app.use('/', require('./routes/home'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  /*const error = new Error('Error fatal');
  error.status = 401;
  next();*/
next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

//Comprobar si es un error de validación
if(err.array) {
 // const errorInfo = err.array({ onlyFirstError: true })[0];
  const errorInfo = err.errors[0];  //<-- Es otra forma.
  err.message = `Error en ${errorInfo.location}, parámetro ${errorInfo.param} ${errorInfo.msg}`
  err.status = 422;
}

res.status(err.status || 500);

/*Si lo que ha fallado es una petición al API
  devuelvo el error en formato JSON */
  //console.log(originalUrl)
  if(req.originalUrl.startsWith('/api/')) {
    res.json({ error: err.message })
    return
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
