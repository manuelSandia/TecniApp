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
const { validarCampos }      = require('../middlewares');
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
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearReporte );

// Actualizar un Reporte Registrado por Id:
router.put('/actualizar/:id',[
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeReportePorId ),
    validarCampos
], actualizarReporte );

// Completar una Reporte por Id:
router.put('/completar/:id',[
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeReportePorId ),
    validarCampos
], completarReporte );

// Borrar un Reporte de DB por Id:
router.delete('/borrar/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeReportePorId ),
    validarCampos,
], borrarReporte);

module.exports = router;