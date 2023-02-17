const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

//Para que sea más visual
mongoose.connection.on('error', err => {
    console.log('Error de conexión', err)
});

mongoose.connection.once('open', () => console.log('Conectado a MongoDB en', mongoose.connection.name)) //Lo hará sólo la primera vez

mongoose.connect('mongodb://127.0.0.1:27017/cursonode');

module.exports = mongoose.connection;