const { Schema, model } = require('mongoose');
const Joi = require('joi');

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
    },
    // role: {
    //     type: String,
    //     enum: ['Cliente', 'Repartidor', 'Administrador'],
    //     required: true
    // }
});

const Usuario = model('Usuario', UsuarioSchema);

// function validarUsuario(usuario){
//     const schema = Joi.object({
//         name: Joi.string().min(3).max(50).required(),
//         last_name: Joi.string().min(3).max(50).required(),
//         email: Joi.string().min(5).max(255).required().email(),
//         password: Joi.string().min(6).max(1024).required(),
//         phone: Joi.string().min(5).max(50) 
//     });

//     return schema.validate(usuario);
// }


//En mongoDb se guarda la colección como usuarios
module.exports.Usuario = Usuario;
