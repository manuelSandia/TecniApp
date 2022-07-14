const { Router } = require('express');
const { check }  = require('express-validator');
const { obtenerReportes, 
        obtenerRepAtendidos,
        obtenerReporte,
        crearReporte,
        actualizarReporte,
        borrarReporte,
        completarReporte }   = require('../controllers/reportes');
const { existeReportePorId } = require('../helpers');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const router = Router();





//  Obtener todos los Reportes - publico:
router.get('/obtener', obtenerReportes );

//  Obtener todos los Reportes Atendidos - publico:
router.get('/atendidos', obtenerRepAtendidos );

// Obtener Reporte por Id:
router.get('/obtener/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeReportePorId ),
    validarCampos,
], obtenerReporte );

// Registrar una Reporte:
router.post('/registro', [ 
    // validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearReporte );

// Actualizar una Instalacion Registrada por Id:
router.put('/actualizar/:id',[
    // validarJWT,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeReportePorId ),
    validarCampos
], actualizarReporte );

// Completar una Reporte por Id:
router.put('/completar/:id',[
    // validarJWT,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeReportePorId ),
    validarCampos
], completarReporte );

// Borrar una Instalacion de DB por Id:
router.delete('/borrar/:id',[
    // validarJWT,
    // esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeReportePorId ),
    validarCampos,
], borrarReporte);

module.exports = router;