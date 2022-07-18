const { Schema, model } = require('mongoose');

const ReporteSchema = Schema({
    
    cedula: {
        type: String,
        required: [true, 'El numero de cedula es obligatorio']    
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    telefono: {
        type: String,
        required: [true, 'El numero telefonico es obligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'la direccion es obligatoria']
    },
    zona: {
        type: String,
        required: [true, 'la zona es obligatoria']
    },
    descripcion: {
        type: String,
        required: [true, 'la descripcion es obligatoria']
    },
    fecha: {
        type: String,
        required: [true, 'la fecha es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        // required: true
    },
    
},
{ timestamps: true });


ReporteSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Reporte', ReporteSchema );
