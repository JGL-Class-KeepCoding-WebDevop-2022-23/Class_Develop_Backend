const express = require('express')
const router = express.Router();
const Agente = require('../../models/Agente')

//  GET / Api / agentes
//Devuelve una lista de agentes
router.get('/', async (req, res, next) => {
    try {
  
      const filterByName = req.query.name;
      const filterByAge = req.query.age;
      
      //paginación
      const skip = req.query.skip;
      const limit = req.query.limit;

      //Ordenación
      const sort = req.query.sort;

      //Selección de campos
      const fields = req.query.fields;

      // Ejemplos
      //127.0.0.1:3000/api/agentes?skip=2
      //127.0.0.1:3000/api/agentes?sort=-age name
      //127.0.0.1:3000/api/agentes?sorts=-age name&fields=age -_id

      const filtro = {};
      if (filterByName) {
        filtro.name = filterByName
      }

      if (filterByAge) {
        filtro.age = filterByAge
      }
      const agentes = await Agente.lista(filtro, skip, limit, sort, fields);
  
      res.json({ results: agentes });
  
    } catch (error) {
      next(error);
    }
  });

  //GET api/agentes/(_id)
  // Devuelve un agente buscando por _id
  router.get('/:id', async (req, res, next) => {
    try {
  
      const id = req.params.id;
  
      const agente = await Agente.findById(id);

      if (agente) {
        agente.saluda();
      };
  
      res.json({ result: agente });
  
    } catch (error) {
      next(error);
    }
  
  });

// PUT /api/agentes/*:(id) (body)<-- Realizar cambio total en el agente.

router.put('/:id', async (req, res, next) => {
  try {
    
    const id = req.params.id;
    const data = req.body;

    const agenteActualizado = await Agente.findByIdAndUpdate(id, data, {
      new: true     //Esto hace que nos devuelva el documento actualizado
     });

    res.json({ result: agenteActualizado });

  } catch (error) {
    next(error)
    
  }

})
//PATCH /api/agentes <-- Realizar cambios concretos ene l agente

//POST /api/agente  (body)
// Crea un agente
router.post('/', async (req, res, next) => {
try {
  
  const agenteData = req.body;
  
  // Creamos una instancia de Agente
  const agente = new Agente(agenteData)

  // La persistimos en la BD
  const agenteGuardado = await agente.save();

  res.json({ result: agenteGuardado });

} catch (error) {
  next(error)
}
});

// DELETE /api/agente/:(id)
//Elimina un agente

router.delete('/:id', async (req, res, next) => {
  try {

    const id = req.params.id;
    //Se puede hacer una busqueda tipo, si existe, lo borras, si no, me avisas
    await Agente.deleteOne({ _id: id });

    res.json();
    
  } catch (error) {
    next(error)
  }
})



  module.exports = router;