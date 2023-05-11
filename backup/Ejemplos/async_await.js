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
};

async function main() {
   const resultado = await sleep(2000);
   console.log(resultado);

   /*const resultado2 = await sleep(2000);
   console.log(resultado2);*/

   for ( let i = 0; i < 5; i++) {
    console.log(await sleep(1000))
   }
}

main();

//await sleep(2000); //top level await