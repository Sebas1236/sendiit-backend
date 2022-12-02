const { response } = require("express");
const Usuario = require("../models/Usuario");


const actualizarUsuario = async(req, res = response) => {

    const usuarioId = req.params.id;

    try {

        //Verificar si existe
        const usuario = await Usuario.findById( usuarioId );
        if(!usuario){
            res.status(404).json({
                ok: false,
                msg: 'Usuario no existe por ese id'
            });
        }

        const nuevoUsuario = {
            ...req.body,
        }

        // const usuarioActualizado = await Usuario.findByIdAndUpdate( usuarioId,  );
        
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