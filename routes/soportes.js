const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerSoportes, 
        obtenerSopRealizados,
        obtenerSoporte,
        crearSoporte,
        actualizarSoporte,
        borrarSoporte,
        completarSoporte } = require('../controllers/soportes');
const { existeSoportePorId } = require('../helpers');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
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
    // validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearSoporte );

// Actualizar un Soporte por Id:
router.put('/actualizar/:id',[
    // validarJWT,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeSoportePorId ),
    validarCampos
], actualizarSoporte );

// Completar un soporte por Id:
router.put('/completar/:id',[
    // validarJWT,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeSoportePorId ),
    validarCampos
], completarSoporte );

// Borrar una Soporte de DB por Id:
router.delete('/borrar/:id',[
    // validarJWT,
    // esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeSoportePorId ),
    validarCampos,
], borrarSoporte);

module.exports = router;