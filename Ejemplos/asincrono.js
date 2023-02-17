'use strict';

function escribeTras2Segundos(texto, callback) {
    setTimeout(() => {
        console.log(texto);
        callback();
    }, 2000)
}

//Creamos un bucle asíncrono recursivo con callbacks
function serie(n, fn, callback){ 
    n = n - 1;
    if (n === 0){
        //termino el bucle
        callback();
        return
    }
    fn('texto' + n, () => {
        serie(n, fn, callback)
    })
};


console.log('Inicio')
serie(5, escribeTras2Segundos, () => {console.log('Fin')})
/*escribeTras2Segundos('Texto1', () =>{
    escribeTras2Segundos('Texto2', () =>{
        console.log('Fin')
    });
});*/
