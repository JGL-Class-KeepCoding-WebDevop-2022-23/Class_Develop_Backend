'use strict';
//Crear una función para usarla cmo constructor de objetos
function Fruta(nombre) {
    this.nombre = nombre;
    this.saluda = function(){
        console.log('Hola, soy: ', this.nombre)
    }
};

const limon = new Fruta('Limon');

/* Donde están los paréntesis de ejecución
mira lo anterior al punto de la izquierda
y lo usa como 'this' para el método saluda()
*/
//limon.saluda();

//setTimeout(limon.saluda, 2000)
setTimeout(limon.saluda.bind(limon), 2000)

const unaFuncion = limon.saluda;
//const unaFuncion = limon.saluda.bind(limon);
//unaFuncion();
unaFuncion.call(limon)