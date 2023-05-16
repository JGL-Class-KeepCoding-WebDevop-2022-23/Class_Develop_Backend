'use strict';

require('dotenv').config();

const { Agente, Usuario } = require('../models');

const connection = require('../lib/connectMongoose');

main().catch(err => console.log('Hubo un error', err));

async function main() {

  // inicializamos colección de agentes
  await initAgentes();

  // inicializamos colección de usuarios
  await initUsuarios();

  connection.close();

}

async function initAgentes() {
  // borrar todos los documentos de la colección de agentes
  const deleted = await Agente.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} agentes.`);

  // crear agentes iniciales
  const inserted = await Agente.insertMany([
    { name: 'Brown', age: 32 },
    { name: 'Jones', age: 46 }
  ]);
  console.log(`Creados ${inserted.length} agentes`);
}

async function initUsuarios() {
  // borrar todos los documentos de usuarios
  const deleted = await Usuario.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  // crear usuarios iniciales
  const inserted = await Usuario.insertMany([
    { email: 'admin@example.com', password: await Usuario.hashPassword('1234')},
    { email: 'usuario@example.com', password: await Usuario.hashPassword('1234')},
  ]);
  console.log(`Creados ${inserted.length} usuarios.`);
}
