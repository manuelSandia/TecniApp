const Role = require('../models/role');
const { Usuario, Categoria, Producto, Instalacion, Soporte, Reporte } = require('../models');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


const existeCategoriaPorId = async( id ) => {

    // Verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


const existeProductoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeInstalacionPorId = async( id ) => {

    // Verificar si el correo existe
    const existeInstalacion = await Instalacion.findById(id);
    if ( !existeInstalacion ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeReportePorId = async( id ) => {

    // Verificar si el correo existe
    const existeReporte = await Reporte.findById(id);
    if ( !existeReporte ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeSoportePorId = async( id ) => {

    // Verificar si el correo existe
    const existeSoporte = await Soporte.findById(id);
    if ( !existeSoporte ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }
    return true;
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas,
    existeInstalacionPorId,
    existeSoportePorId,
    existeReportePorId
}

