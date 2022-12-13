const mongoose = require('mongoose');

const Casillero = mongoose.model('Casillero', new mongoose.Schema({
    tamano: {
        type: String,
        enum: ['Pequeño', 'Mediano', 'Grande'],
        required: true
    },
    ubicacion: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    ocupado: {
        type: Boolean,
        default: false
    },
    // precio: {
    //     type: Number,
    //     required: true
    // }
    //Dimensiones
    //QR?
}));


module.exports = Casillero;