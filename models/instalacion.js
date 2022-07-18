const { Schema, model } = require('mongoose');

const InstalacionSchema = Schema({
    
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
    direccion: {
        type: String,
        required: [true, 'la direccion es obligatoria']
    },
    zona: {
        type: String,
        required: [true, 'la zona es obligatoria']
    },
    coordenadas: {
        type: String,
        required: [true, 'las coordenadas son obligatorias']
    },
    antena: {
        type: String,
        required: [true, 'El modelo de antena es obligatorio']
    },
    router: {
        type: String,
        required: [true, 'El modelo de router es obligatorio']
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
    },
    
},
{ timestamps: true });


InstalacionSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Instalacion', InstalacionSchema );
