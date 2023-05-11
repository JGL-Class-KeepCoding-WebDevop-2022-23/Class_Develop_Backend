'use strict';

const EventEmitter = require('events'); //Librería de nodeJS para gestionar los eventos

const emisor = new EventEmitter();

emisor.on('Llamada de teléfono', function(quienLlama){    //Se ejecuta esta función cada vez que salta este eevento
    if (quienLlama === 'madre') {
        return;
    }
    console.log('Ring, ring!');
});

emisor.once('Llamada de teléfono', function(quienLlama){  //Se ejecuta esta función la primera vez que salta este eevento
    console.log('brrr brrr')
})

emisor.emit('Llamada de teléfono', "madre");
emisor.emit('Llamada de teléfono', "madre");
emisor.emit('Llamada de teléfono', "madre");