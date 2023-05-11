const mongoose = require('mongoose');

// Definimos el esquema de los agentes para que no se pueda meter nada que no queramos
const agenteSchema = mongoose.Schema({
    name: String,
    age: { type: Number, min: 18, max: 90 }
    //documento: mongoose.Schema.Types.Mixed //Aquí le podemos meter cualquier tipo de dato. Lleva todo lo demás porque JS  no tiene Mixed.
}, {
    //collection: 'agentes' //Para que no haga la pluralización y le indicamos la colección concreta. Tb se le puede poner en el modelo, como tercer parámetro.
});

// Tipos de métodos
// Agentes.createWithColor('red)    --> Método estático
// agente.sendEmail({ subject: 'sdfs ' }) --> Método de instancia NO USAR ARROW FUNCTIONS

agenteSchema.statics.lista = function(filtro, skip, limit, sort, fields) {
    const query = Agente.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(fields);
    return query.exec();
}

agenteSchema.method.saluda = function() {
    console.log(`Hola, soy el agente ${this.name}`)
}

// Creamos el modelo de Agente
const Agente = mongoose.model('Agente', agenteSchema);


// Exportamos el modelo para poder usarlo en otras partes de la aplicación
module.exports = Agente;

