var express = require('express');
var router = express.Router();
const { query, validationResult } = require('express-validator'); //Del objeto que cargue, coge el método query y el validationResult
const Agente = require('../models/Agente'); //Cargamos el modelo Agente

/* GET home page. */
router.get('/', async function (req, res, next) {
    //middelware que devuelve una Promesa (por el async)
    try {
        //Por eso le hemos metido el try-catch

        //res.locals.nombre = '<script>alert("inyección de código")</script>';
        res.locals.texto = res.__('Text'); //Intenacionalización en un administrador
        res.locals.nombre = 'Javier';

        res.locals.usuarios = [
            { nombre: 'Smith', edad: 36 },
            { nombre: 'Jones', edad: 40 },
        ];

        const agentes = await Agente.find();
        res.locals.agentes = agentes;

        const ahora = new Date();
        res.locals.paridad = ahora.getSeconds() % 2 === 0;
        res.locals.segundoActual = ahora.getSeconds();

        //res.render('index', { title: 'NodeApp' });
        res.render('index');
    } catch (err) {
        next(err); // El catch recoge el error y llama a next()
    }
});

router.get('/pepe', (req, res, next) => {
    res.send('Soy Pepe');
});

//Ejemplo recibir parámetro en ruta
router.get('/parametro_en_ruta/:numero', (req, res, next) => {
    console.log(req.params);
    const numero = req.params.numero;

    res.send('Me has pedido el número ' + numero);
});

router.get('/parametro_opcional/:numero?', (req, res, next) => {
    console.log(req.params);
    const numero = req.params.numero;

    res.send('(Opcional) Me has pedido el número ' + numero);
});

//Ejemplo recibir varios parámetros en la ruta
/*router.get('/producto/:nombre/talla/:talla/color/:color', (req, res, next) => {
  const nombre = req.params.nombre;
  const talla = req.params.talla;
  const color = req.params.color;

  res.send(`Me pediste ${nombre} talla ${talla} y color ${color}`);

})
*/

//Ejemplo recibir varios parámetros en la ruta con un rago o formato específico
router.get(
    '/producto/:nombre/talla/:talla([0-9]+)/color/:color',
    (req, res, next) => {
        const nombre = req.params.nombre;
        const talla = req.params.talla;
        const color = req.params.color;

        res.send(`Me pediste ${nombre} talla ${talla} y color ${color}.`);
    }
);

//Ejemplo querystrings
//GET / parametro_query_string?talla=35&color=rojo
router.get(
    '/parametro_query_string',
    [
        //validaciones
        query('talla').isNumeric().withMessage('Debe tener un valor numérico'),
        query('color')
            .custom((valor) => {
                return valor === 'rojo';
            })
            .withMessage('debe ser "rojo"'),
    ],
    (req, res, next) => {
        validationResult(req).throw(); //Para el request. Si no valida, da un error que llama a next y hay que decirle cómo pintar el error
        const talla = req.query.talla;
        const color = req.query.color;

        res.send(`Me has pedido una talla ${talla} de color ${color}.`);
    }
);

//Ejemplo para el cuerpo
//POST /enelbody
router.post('/enelbody', (req, res, next) => {
    const altura = req.body.altura;
    const peso = req.body.peso;

    console.log('BODY recibido:', req.body);

    res.send(`petición POST recibida con altura ${altura} y peso ${peso}`);
});

module.exports = router;
