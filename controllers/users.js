const { response } = require("express");
const { generarDeliveryManJWT, generarJWT } = require("../helpers/jwt");
const { sendNewDeliveryManEmail } = require("../helpers/nodemailer.config");
const bcrypt = require('bcryptjs');
const { Usuario } = require("../models/Usuario");

const getUsuario = async (req, res = response) => {

    const uid = req.uid;
    try {
        const usuario = await Usuario.findById(uid);
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
};

const getUsuariosByRole = async (req, res = response) => {
    const { role } = req.body;
    // console.log(role);
    const usuarios = await Usuario.find({ role });

    res.json({
        ok: true,
        usuarios,
    })
}

const createDeliveryMan = async (req, res = response) => {

    const { name, last_name, email, phone, role } = req;
    const status = 'Active';
    const { password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }
        usuario = new Usuario({ ...req, status });

        // Encriptar contraeña
        // 1. GENERAR INFO ALEATORIA
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        usuario.status = 'Active';
        usuario.role = 'Repartidor';
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let code = '';
        for (let i = 0; i < 25; i++) {
            code += characters[Math.floor(Math.random() * characters.length)];
        }
        usuario.confirmationCode = code;
        //Grabar en BD
        await usuario.save();
        //Middleware -> Función que se ejecuta antes de cualquier otra cosa
        res.status(201).json({
            ok: true,
            usuario,
            uid: usuario.id,
            name: usuario.name,
            last_name: usuario.last_name,
            // token,
            msg: "Registro exitoso!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
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

const updateDeliveryMan = async (req, res = response) => {
    const { registerName, registerLastName, phone } = req.body;
    const deliveryManId = req.params.id;
    // console.log(deliveryManName);
    try {

        //Verificar si existe
        const deliveryMan = await Usuario.findById(deliveryManId);
        if (!deliveryMan) {
            return res.status(404).json({
                ok: false,
                msg: 'deliveryMan no existe por ese id'
            });
        }
        deliveryMan.name = registerName;
        deliveryMan.last_name = registerLastName;
        deliveryMan.phone = phone;

        const deliveryManActualizado = await deliveryMan.save();
        // console.log(deliveryManActualizado);
        res.json({
            ok: true,
            deliveryManActualizado,
            deliveryManId,
        })

    } catch (error) {
        console.log(error);
        //Problema interno
        res.status(500).json({
            ok: false,
            msg: 'Error actualizando repartidor'
        });
    }
}

const sendDeliveryManEmail = async (req, res = response) => {

    try {
        const { registerName: name, registerLastName: last_name, registerEmail: email, phone } = req.body;
        const role = 'Repartidor';
        const token = await generarDeliveryManJWT(name, role, last_name, email, phone);
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }
        //TODO: ENVIAR EMAIL PARA QUE CREE SU CONTRASEÑA
        sendNewDeliveryManEmail(name, email, token);
        res.json({
            ok: true,
            msg: 'Email enviado',
            name, role, last_name, email,
        })
    } catch (error) {
        console.log(error);
    }
};

const deleteDeliveryMan = async (req, res = response) => {
    const deliveryManId = req.params.id;
    try {
        const deliveryMan = await Usuario.findById(deliveryManId);

        if (!deliveryMan) {
            return res.status(400).json({
                ok: false,
                msg: 'Repartidor no existe por ese id'
            });
        }

        await Usuario.findByIdAndDelete(deliveryManId);

        res.json({
            ok: true,
        })

    } catch (error) {
        console.log(error);
        //Problema interno
        res.status(500).json({
            ok: false,
            msg: 'Error eliminando repartidor',
        });
    }
};

const updateDeliveryManStatus = async (req, res = response) => {
    try {
        // console.log(req.body);
        const { deliveryManId } = req.body;
        const deliveryMan = await Usuario.findById(deliveryManId);
        // console.log(deliveryMan.status);
        deliveryMan.status === 'Active' ? deliveryMan.status = 'Pending' : deliveryMan.status = 'Active';
        await deliveryMan.save();
        res.status(200).json({
            ok: true,
            status: deliveryMan.status,
        })
    } catch (error) {
        console.log(error);
        //Problema interno
        res.status(500).json({
            ok: false,
            msg: 'Error actualizando status del repartidor',
        });
    }
}

module.exports = {
    actualizarUsuario,
    getUsuario,
    getUsuariosByRole,
    createDeliveryMan,
    updateDeliveryMan,
    updateDeliveryManStatus,
    sendDeliveryManEmail,
    deleteDeliveryMan,
}