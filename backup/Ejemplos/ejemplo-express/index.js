'use strict';

//Cargar la librería de express
const express = require('express');

//Crear la Api
const app = express()


//Añadimos una ruta
app.get('/', (request, response, next) => {
    response.send('Pasa tuu?')
});

//Arrancamos el servidor
app.listen(8080, () => {
    console.log('Servidor HTTP arrancado en http://127.0.0.1:8080');
});