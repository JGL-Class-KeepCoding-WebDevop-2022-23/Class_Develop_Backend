'use strict';

const Agente = require('../models/Agente');
const connection = require('../lib/connectMongoose')

main().catch(err => console.log('Hubo un error:', err));

async function main() {     //Devuelve una promesa

    // Inicializamos colección de agentes
    await initAgentes();

    connection.close();
};

async function initAgentes() {
    // Borrar todos los docuementos de la colección Agentes
    const deleted = await Agente.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} agentes`);

    // Crear agentes iniciales
    const inserted = await Agente.insertMany([
        { name: 'Brown', age: 32 },
        { name: 'Jones', age: 46 }
    ]);
    console.log(`Creados ${inserted.length} agentes`)
}