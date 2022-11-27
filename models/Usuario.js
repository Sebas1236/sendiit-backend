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
    }
});


//En mongoDb se guarda la colección como usuarios
module.exports = model('Usuario', UsuarioSchema );
