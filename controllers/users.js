const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');

const actualizarUsuario = async(req, res = response) => {

    const usuarioId = req.params.id;
    // console.log(req.body);
    try {

        //Verificar si existe
        const usuario = await Usuario.findById( usuarioId );
        if(!usuario){
            res.status(404).json({
                ok: false,
                msg: 'Usuario no existe por ese id'
            });
        }
        //TODO: la contraseña se obtendrá de la bd y no del req.body
        const nuevoUsuario = {
            ...req.body,
            status: 'Active',
            confirmationCode: ''
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate( usuarioId, nuevoUsuario , {new:true});
        res.json({
            ok: true,
            usuarioActualizado,
            uid: usuarioActualizado.id,
            name: usuarioActualizado.name,
            last_name: usuarioActualizado.last_name,
            email: usuarioActualizado.email, password: usuarioActualizado.password,
        })
        
    } catch (error) {
        console.log(error);
        //Problema interno
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    actualizarUsuario,
}