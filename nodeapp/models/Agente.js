const mongoose = require('mongoose');

// definir el esquema de los agentes
const agenteSchema = mongoose.Schema({
  name: String,
  age: { type: Number, min: 18, max: 90 },
}, {
  // collection: 'agentes'
});

// Tipos de métodos:
// - Agente.createWithColor('red')  --> método estático
// - agente.sendEmail({ subject: 'asdsa' }) --> método de instancia (no usar arrow functions)

agenteSchema.statics.lista = function(filtro, skip, limit, sort, fields) {
  const query = Agente.find(filtro); // thenables
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
}

agenteSchema.methods.saluda = function() {
  console.log('Hola, soy el agente', this.name);
}

// crear el modelo de Agente
const Agente = mongoose.model('Agente', agenteSchema);

// exportar el modelo
module.exports = Agente;