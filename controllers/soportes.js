const { response }    = require('express');
const { Soporte } = require('../models');


// Controlador para Obtener todos los Soportes tecnicos:
const obtenerSoportes = async(req, res = response ) => {

    const { limite = 20, desde = 0 } = req.query;
    const query = { estado: true };
    
    const [ total, soportes ] = await Promise.all([
        Soporte.countDocuments(query),
        Soporte.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        soportes,
    });
}


// Controlador para Obtener todos los soportes Tecnicos Realizados
const obtenerSopRealizados = async(req, res = response ) => {

    const { limite = 20, desde = 0 } = req.query;
    const query = { estado: false };
    
    const [ total, soportes ] = await Promise.all([
        Soporte.countDocuments(query),
        Soporte.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        soportes,
    });
}


// Controlador para Obtener un Soporte Tecnico por ID:
const obtenerSoporte = async(req, res = response ) => {

    const { id } = req.params;
    const soporte = await Soporte.findById( id )
                            .populate('usuario', 'nombre')
                            

    res.json( soporte );

}


// Controlador para Registrar un Soporte Tecnico:
const crearSoporte = async(req, res = response ) => {

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

    const soporte = new Soporte( data );

    // Guardar DB
    await soporte.save();

    res.status(201).json(soporte);

}


// Controlador para Actualizar datos de un Soporte por ID:
const actualizarSoporte = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if( data.nombre ) {
        data.nombre   = data.nombre.toUpperCase();
        data.apellido = data.apellido.toUpperCase();
        data.cedula   = data.cedula.toUpperCase();
    }

    // data.usuario = req.usuario._id;

    const soporte = await Soporte.findByIdAndUpdate(id, data, { new: true });

    res.json( soporte );

}


// Constrolador para Borrar un Soporte por ID:
const borrarSoporte = async(req, res = response ) => {

    const { id } = req.params;
    const soporteBorrado = await Soporte.findByIdAndDelete( id );

    res.json( soporteBorrado );
}


// Controlador para marcar como realizado un Soporte:
const completarSoporte = async(req, res = response ) => {

    const { id } = req.params;
    const soporteRealizado = await Soporte.findByIdAndUpdate( id, { estado: false }, {new: true });
    res.json( soporteRealizado );
}

module.exports = {
    obtenerSoportes,
    obtenerSopRealizados,
    obtenerSoporte,
    crearSoporte,
    actualizarSoporte,
    borrarSoporte,
    completarSoporte

}