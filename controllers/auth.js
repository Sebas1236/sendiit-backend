const { response } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
const { sendConfirmationEmail } = require('../helpers/nodemailer.config');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }
        usuario = new Usuario(req.body);

        // Encriptar contraeña
        // 1. GENERAR INFO ALEATORIA
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // TODO2: ACTUALIZAR CONFIRMATIONCODE EN LA BD
        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let code = '';
        for (let i = 0; i < 25; i++) {
            code += characters[Math.floor(Math.random() * characters.length)];
        }
        usuario.confirmationCode = code;
        //Grabar en BD
        await usuario.save();
        //Middleware -> Función que se ejecuta antes de cualquier otra cosa

        //Enviamos el correo
        sendConfirmationEmail(
            usuario.name,
            usuario.email,
            usuario.confirmationCode,
        );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            last_name: usuario.last_name,
            token,
            msg: "Registro exitoso! Por favor cheque su correo",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}


const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto',
            });
        }

        //Comprobamos si la cuenta está verificada
        if (usuario.status !== 'Active') {
            return res.status(401).json({
                ok: false,
                msg: 'Cuenta inactiva. Por favor verifique su Email!',
            });
        }
        //TODO: GENERAR JWT PARA CORREO

        // Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

//Función para el correo de verificación
const verificarUsuario = async (req, res = response) => {
    //TODO: BUSCAR POR TOKEN

    const confirmationCode = req.params.confirmationCode;

    try {
        const usuario = await Usuario.findOne({ confirmationCode });
        //Para retornar la última opción actualizada el tercer parámetro
        const usuarioActualizado = await Usuario.findOneAndUpdate({ confirmationCode }, { $set: { 'status': 'Active' } }, { new: true });

        res.json({
            ok: true,
            status: usuario.status,
            msg: 'Cuenta activada con éxito',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Código incorrecto'
        });
    }
};


const revalidarToken = async (req, res = response) => {

    const { uid, name } = req;

    // Generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid, name,
        token,
    });

};




module.exports = {
    crearUsuario,
    loginUsuario,
    verificarUsuario,
    revalidarToken,
};