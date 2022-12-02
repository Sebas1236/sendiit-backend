const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending',
    },
    confirmationCode: {
        type: String,
        unique: true,
    },
    phone: {
        type:String,
    }
});


//En mongoDb se guarda la colección como usuarios
module.exports = model('Usuario', UsuarioSchema );
