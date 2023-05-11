'use strict';

function escribeTras2Segundos(texto, callback) {
    setTimeout(() => {
        console.log(texto);
        callback();
    }, 2000)
}

//Creamos un bucle asíncrono recursivo con callbacks
function serie(arr, fn, callback) {
    if (arr.length === 0) {
    // termino el bucle
    callback();
    return;
  }
  fn('texto ' + arr.shift(), () => {
    serie(arr, fn, callback);
  })
}



console.log('inicio');

serie(['uno', 'dos', 'tres', 'cuatro', 'cinco'], escribeTras2Segundos, () => {
  console.log('fin');
})

/*escribeTras2Segundos('Texto1', () =>{
    escribeTras2Segundos('Texto2', () =>{
        console.log('Fin')
    });
});*/
