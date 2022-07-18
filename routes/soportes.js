const { Router } = require('express');
const { check }  = require('express-validator');
const { obtenerSoportes, 
        obtenerSopRealizados,
        obtenerSoporte,
        crearSoporte,
        actualizarSoporte,
        borrarSoporte,
        completarSoporte }   = require('../controllers/soportes');
const { existeSoportePorId } = require('../helpers');
const { validarCampos }      = require('../middlewares');
const router = Router();


//  Obtener todas los Soportes- publico:
router.get('/obtener', obtenerSoportes );

//  Obtener todos los soportes realizados - publico:
router.get('/completadas', obtenerSopRealizados );

// Obtener soportes por Id:
router.get('/obtener/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeSoportePorId ),
    validarCampos,
], obtenerSoporte );

// Registrar un Soporte:
router.post('/registro', [ 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearSoporte );

// Actualizar un Soporte por Id:
router.put('/actualizar/:id',[
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeSoportePorId ),
    validarCampos
], actualizarSoporte );

// Completar un soporte por Id:
router.put('/completar/:id',[
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeSoportePorId ),
    validarCampos
], completarSoporte );

// Borrar una Soporte de DB por Id:
router.delete('/borrar/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeSoportePorId ),
    validarCampos,
], borrarSoporte);

module.exports = router;