const { response }    = require('express');
const { Instalacion } = require('../models');


// Controlador para Obtener todas las Instalaciones:
const obtenerInstalaciones = async(req, res = response ) => {

    const { limite = 20, desde = 0 } = req.query;
    const query = { estado: true };
    
    const [ total, instalaciones ] = await Promise.all([
        Instalacion.countDocuments(query),
        Instalacion.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        instalaciones,
    });
}


// Controlador para Obtener todas las Instalaciones Completadas:
const obtenerInstCompletadas = async(req, res = response ) => {

    const { limite = 20, desde = 0 } = req.query;
    const query = { estado: false };
    
    const [ total, instalaciones ] = await Promise.all([
        Instalacion.countDocuments(query),
        Instalacion.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        instalaciones,
    });
}


// Controlador para Obtener una Instalacion por ID:
const obtenerInstalacion = async(req, res = response ) => {

    const { id } = req.params;
    const instalacion = await Instalacion.findById( id )
                            .populate('usuario', 'nombre')
                            

    res.json( instalacion );

}


// Controlador para Registrar una Instalacion:
const crearInstalacion = async(req, res = response ) => {

    const { estado, usuario, ...body } = req.body;

    // Generar la data a guardar
    const data = {
        ...body,
        nombre:   body.nombre.toUpperCase(),
        apellido: body.apellido.toUpperCase(),
        cedula:   body.cedula.toUpperCase()
    }

    const instalacion = new Instalacion( data );

    // Guardar DB
    await instalacion.save();

    res.status(201).json(instalacion);

}


// Controlador para Actualizar una Instalacion por ID:
const actualizarInstalacion = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if( data.nombre ) {
        data.nombre   = data.nombre.toUpperCase();
        data.apellido = data.apellido.toUpperCase();
        data.cedula   = data.cedula.toUpperCase();
    }

    // data.usuario = req.usuario._id;

    const instalacion = await Instalacion.findByIdAndUpdate(id, data, { new: true });

    res.json( instalacion );

}


// Constrolador para Borrar Instalacion por ID:
const borrarInstalacion = async(req, res = response ) => {

    const { id } = req.params;
    const instalacionBorrada = await Instalacion.findByIdAndDelete( id );

    res.json( instalacionBorrada );
}


// Controlador para marcar como completada una Instalacion:
const completarInstalacion = async(req, res = response ) => {

    const { id } = req.params;
    const instalacionCompletada = await Instalacion.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( instalacionCompletada );
}

module.exports = {
    crearInstalacion,
    obtenerInstalaciones,
    actualizarInstalacion,
    borrarInstalacion,
    obtenerInstalacion,
    obtenerInstCompletadas,
    completarInstalacion
}