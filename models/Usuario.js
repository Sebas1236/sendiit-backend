const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    last_name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 1024,
        required: true
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
        minlength: 5,
        maxlenght: 50
    }
});


//En mongoDb se guarda la colección como usuarios
module.exports = model('Usuario', UsuarioSchema );
