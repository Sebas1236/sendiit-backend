const mongoose = require('mongoose');

const paqueteSchema = new mongoose.Schema({
    casilleroOrigen: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Casillero'
    },
    casilleroDestino: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Casillero'
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    // usuarioRepartidor: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'Usuario'
    // },
    destinatario: {
        nombre: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        apellido: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,    
        },
        telefono: {
            type: String,
            required: true,
            minlength: 5,
            maxlenght: 50
        },
        direccion: {
            type: String,
            // required: true,
            minlength: 5,
            maxlength: 255
        }
    },
    // dimensiones: [{
    //         type: Number,
    //         required: true,
    //         min: 0,
    //         max: 25
    // }],
    tamano: {
        type: String,
        enum: ['Pequeño', 'Mediano', 'Grande'],
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
    costo: {
        type: Number,
        required: true,
        min: 0,
    },
    estadoActual: {
        type: String,
        enum: ['Por recibir', 'En espera', 'En camino', 'En locker de destino', 
            'Recogido', 'En almacén', 'Desechado'],
        required: true,
        default: 'Por recibir'
    },
    estadosFechas: {
        porRecibir: {
            type: Date,
            required: true,
            default: Date.now
        },
        enEspera: {
            type: Date,
        },
        enCamino: {
            type: Date,
        },
        enLockerDeDestino: {
            type: Date,
        },
        recogido: {
            type: Date,
        },
        enAlmacen: {
            type: Date,
        },
        desechado: {
            type: Date,
        }
    },
    qrOrigen:{
        type: "String",
        default: "sin qr"
    },
});

const Paquete = mongoose.model('Paquete', paqueteSchema);

paqueteSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = Paquete;