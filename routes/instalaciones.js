const { Router } = require('express');
const { check }  = require('express-validator');
const { validarCampos } = require('../middlewares');
const { crearInstalacion, 
    obtenerInstalaciones,
    actualizarInstalacion,
    borrarInstalacion,
    obtenerInstalacion,
    obtenerInstCompletadas,
    completarInstalacion }       = require('../controllers/instalaciones');
const { existeInstalacionPorId } = require('../helpers');
const router = Router();

//  Obtener todas las Instalaciones - publico:
router.get('/obtener', obtenerInstalaciones );

//  Obtener todas las Instalaciones Completadas - publico:
router.get('/completadas', obtenerInstCompletadas );

// Obtener Instalacion por Id:
router.get('/obtener/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeInstalacionPorId ),
    validarCampos,
], obtenerInstalacion );

// Registrar una Instalacion:
router.post('/registro', [ 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearInstalacion );

// Actualizar una Instalacion Registrada por Id:
router.put('/actualizar/:id',[
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeInstalacionPorId ),
    validarCampos
], actualizarInstalacion );

// Completar una Instalacion por Id:
router.put('/completar/:id',[
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeInstalacionPorId ),
    validarCampos
], completarInstalacion );

// Borrar una Instalacion de DB por Id:
router.delete('/borrar/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeInstalacionPorId ),
    validarCampos,
], borrarInstalacion);

module.exports = router;