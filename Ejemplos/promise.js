'use strict'

// Función que devuelve una promesa

function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //if (true) {
            //    reject(new Error('Fatal'))
            //}
            resolve(45);
        }, ms);
    })
}

const promesa = sleep(2000);

console.log(promesa);

/*
promesa.then((result) => {
    console.log('Pasaron 2 segundos', result)
    throw new Error('Crash en el primer .then'); //Lanzo una excepción (fuerza un error) lanzando un promesa nueva rechazada
    return sleep(2000);
}).catch(err => {                           //Capturar error intermedio y permitir que el código siga.
    console.log('Falló lo que sea')
    return sleep(100)                       //Con esto devolvemos la función para que el then sguiente tenga un result que mostrar
}).then((result) => {
    console.log('Pasaron 2 segundos', result)
    return sleep(2000);
}).then((result) => console.log('fin', result)
).catch(err => console.log('Hubo un error', err.message)) //Sirve para capturar cualquier error de los pasos anteriores
*/

Promise.all([sleep(1000), sleep(5000), sleep(3000)]).then((results) => console.log('Terminaron todas las promesas con ', results));
//Promise.all([sleep(1000), sleep(5000), sleep(3000)]).then((results) => console.log('Terminaron todas las promesas con ', results));