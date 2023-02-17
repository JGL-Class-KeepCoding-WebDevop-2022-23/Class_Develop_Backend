'use strict';

function Persona(nombre) {
    this.nombre = nombre;
}

const pepe = new Persona('Pepe');
const luis = new Persona('Luis');

//añado propiedades al prototipo de las personas
Persona.prototype.saluda = function() {console.log(`Hola, soy ${this.nombre}`)}
pepe.saluda();
luis.saluda();

//Herencia Simple ------------------------

function Agente(nombre) {
    // heredar el constructor de las personas llamando al constructor de las personas con mi this
    Persona.call(this, nombre);
}
//Heredar las propiedades de las personas
Agente.prototype = Object.create(Persona.prototype);
Agente.prototype.constructor = Agente;

const smith = new Agente(`Smith`);

smith.saluda();

//Herencia Múltiple ------------------------

//Mixing
function Superheroe() {
    this.vuela = function() { console.log(`${this.nombre} vuela`) };
}

//copiar todas las propiedades de los superheroes al prototipo del agente
const superheroe = new Superheroe();
console.log(superheroe)
Object.assign(Agente.prototype, superheroe);
//Object.assign(Agente.prototype, new Superheroe());


smith.vuela()
