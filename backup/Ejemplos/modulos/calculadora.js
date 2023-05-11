'use strict'

console.log('Inicializao la calculadora');
/*module.exports = {
    suma: (a, b) => a + b,
    resta: (a, b) => a - b,
};
*/
// exports es un alias module.exports y si se sobreescribe y deja de funcionar

exports.suma = (a, b) => a + b;
exports.resta = (a, b) => a - b;
