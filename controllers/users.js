const { response } = require("express");
const { Usuario } = require("../models/Usuario");

const getUsuario = async (req, res = response) => {

    const { uid } = req.body;
    try {
        const usuario = await Usuario.findById( uid );
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe por ese id'
            });
        }
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error);
        //Problema interno
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un problema encontrando al usuario'
        });
    }
}

const actualizarUsuario = async (req, res = response) => {

    const { uid, name, last_name, phone } = req.body;
    // console.log(req.body);
    try {

        //Verificar si existe
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            res.status(404).json({
                ok: false,
                msg: 'Usuario no existe por ese id'
            });
        }
        usuario.name = name;
        usuario.last_name = last_name;
        usuario.phone = phone;
        //TODO PASSWORD - Campos en formulario vacíos
        const usuarioActualizado = await usuario.save();
        // console.log(usuarioActualizado);
        res.json({
            ok: true,
            usuarioActualizado,
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
    getUsuario
}