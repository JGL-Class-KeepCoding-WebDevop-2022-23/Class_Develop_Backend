var express = require('express');
var router = express.Router();

const {query, validationResult} = require('express-validator');
const Agente = require('../models/Agente');


/* GET home page. */
router.get('/', async function(req, res, next) {
  try {

    res.locals.texto = res.__('Text');
    res.locals.nombre = `<script>alert("inyección de código")</script>`;

    res.locals.usuarios = [
      { nombre: 'Smith', edad: 34 },
      { nombre: 'Jones', edad: 23 }
    ];

    const agentes = await Agente.find();
    res.locals.agentes = agentes;

    const ahora = new Date();
    res.locals.paridad = (ahora.getSeconds() % 2) === 0;
    res.locals.segundoActual = ahora.getSeconds();

    // res.render('index', { title: 'NodeApp' });
    res.render('index');

  } catch (err) {
    next(err);
  }
});

// GET /parametro_en_ruta/68
router.get('/parametro_en_ruta/:numero', (req, res, next) => {
  console.log(req.params);
  const numero = req.params.numero;

  res.send('me has pedido el numero ' + numero);
});

// GET /parametro_opcional/3333
router.get('/parametro_opcional/:numero?', (req, res, next) => {
  console.log(req.params);
  const numero = req.params.numero;

  res.send('(opcional) me has pedido el numero ' + numero);
});

// GET /producto/pantalones/talla/34/color/gris
router.get('/producto/:nombre/talla/:talla([0-9]+)/color/:color', (req, res, next) => {
  const nombre = req.params.nombre;
  const talla = req.params.talla;
  const color = req.params.color;

  res.send(`Me pedíste ${nombre} ${talla} ${color}`);

})

// GET /parametro_query_string?talla=35&color=rojo
router.get('/parametro_query_string', [ // validaciones:
  query('talla').isNumeric().withMessage('debe tener un valor numérico'),
  query('color').custom(valor => {
    return valor === 'rojo';
  }).withMessage('debe ser "rojo"')
], (req, res, next) => {
  validationResult(req).throw();
  const talla = req.query.talla;
  const color = req.query.color;

  res.send(`Me has pedido talla ${talla} y color ${color}`);
})

// POST /enelbody
router.post('/enelbody', (req, res, next) => {
  const altura = req.body.altura;
  const peso = req.body.peso;

  console.log('BODY recibido:', req.body);

  res.send(`petición POST recibida con altura ${altura} y peso ${peso}`);
});

module.exports = router;
