//Cargar la librería http
const http = require('http');
const Chance = require('chance');

const chance = new Chance();

//Definir un servidor
const servidor = http.createServer(function(request, response){
    response.writeHead(200, {'Content-type': 'text/html'}); //Cabecera, con el tipo de texto y características.

    response.end(`Wake up, <b>${chance.name()}</b>`)    //Lo que mandamos al browser
});

//arrancar el servidor
servidor.listen(1337, '127.0.0.1');
console.log('Servidor arrancado en http://127.0.0.1:1337');