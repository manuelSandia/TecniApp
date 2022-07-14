const { response }    = require('express');
const { Reporte } = require('../models');


// Controlador para Obtener todos los Reportes de Fallas:
const obtenerReportes = async(req, res = response ) => {

    const { limite = 20, desde = 0 } = req.query;
    const query = { estado: true };
    
    const [ total, reportes ] = await Promise.all([
        Reporte.countDocuments(query),
        Reporte.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        reportes,
    });
}


// Controlador para Obtener todos los Reportes Atendidos:
const obtenerRepAtendidos = async(req, res = response ) => {

    const { limite = 20, desde = 0 } = req.query;
    const query = { estado: false };
    
    const [ total, reportes ] = await Promise.all([
        Reporte.countDocuments(query),
        Reporte.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        reportes,
    });
}


// Controlador para Obtener un Reporte por ID:
const obtenerReporte = async(req, res = response ) => {

    const { id } = req.params;
    const reporte = await Reporte.findById( id )
                            .populate('usuario', 'nombre')
                            

    res.json( reporte );

}


// Controlador para Registrar una Instalacion:
const crearReporte = async(req, res = response ) => {

    const { estado, usuario, ...body } = req.body;

    // const instalacionDB = await Instalacion.findOne({ nombre: body.nombre });

    // if ( instalacionDB ) {
    //     return res.status(400).json({
    //         msg: `la instalacion ${ instalacionDB.nombre }, ya existe`
    //     });
    // }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre:   body.nombre.toUpperCase(),
        apellido: body.apellido.toUpperCase(),
        cedula:   body.cedula.toUpperCase()
        // usuario: req.usuario._id
    }

    const reporte = new Reporte( data );

    // Guardar DB
    await reporte.save();

    res.status(201).json(reporte);

}


// Controlador para Actualizar un Reporte por ID:
const actualizarReporte = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if( data.nombre ) {
        data.nombre   = data.nombre.toUpperCase();
        data.apellido = data.apellido.toUpperCase();
        data.cedula   = data.cedula.toUpperCase();
    }

    // data.usuario = req.usuario._id;

    const reporte = await Reporte.findByIdAndUpdate(id, data, { new: true });

    res.json( reporte );

}


// Constrolador para Borrar un Reporte por ID:
const borrarReporte = async(req, res = response ) => {

    const { id } = req.params;
    const reporteBorrado = await Reporte.findByIdAndDelete( id );

    res.json( reporteBorrado );
}


// Controlador para marcar como atendido un Reporte:
const completarReporte = async(req, res = response ) => {

    const { id } = req.params;
    const reporteAtendido = await Reporte.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( reporteAtendido );
}

module.exports = {
    obtenerReportes,
    obtenerRepAtendidos,
    obtenerReporte,
    crearReporte,
    actualizarReporte,
    borrarReporte,
    completarReporte
}