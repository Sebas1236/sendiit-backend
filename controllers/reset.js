const { response } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarResetJWT } = require('../helpers/jwt');
const { sendRecoverEmail } = require('../helpers/nodemailer.config');


//** Restablecer pass actualiza la password
//** Recuperar pass manda el correo con el link */  
const restablecerPass = async (req, res = response) => {
    const { id, token } = req.params;
    const { password, password2 } = req.body;
    //Revisar si existe el id en db
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe',
            })
        }

        //Validar el JWT
        const secret = process.env.SECRET_JWT_SEED + usuario.password;
        // console.log(secret);
        try {
            const payload = jwt.verify(token, secret);
        } catch (error) {
            //El token sólo es válido 1 vez
            if(error.message==='invalid signature'){
                return res.status(500).json({
                    ok: false,
                    msg: 'El token ha expirado, favor de solicitar uno nuevo'
                });
            }
        }        
        //TODO: VERIFICAR TOKEN EXPIRADO

        if( password !== password2 ){
            return res.status(400).json({
                ok: false,
                msg: 'Las contraseñas no coinciden',
            })
        }


        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        const resetPassword = bcrypt.hashSync(password, salt);
        //TODO: ASEGURARSE QUE NO SEA LA MISMA CONTRASEÑA
        //1. Buscar el usuario con el payload email, id
        //2. Actualizar la contraseña
        const usuarioActualizado = await Usuario.findOneAndUpdate( { email: usuario.email } , {$set:{'password':resetPassword}}, { new: true });
        // const usuarioActualizado = await Usuario.findOne({email: usuario.email});

        res.json({
            ok: true,
            msg: 'Restablecer contraseña',
        });
    } catch (error) {
        if(error.message==='invalid signature'){
            return res.status(500).json({
                ok: false,
                msg: 'El token ha expirado, favor de solicitar uno nuevo'
            });
        }
        res.status(500).json({
            ok: false, 
            msg: 'Por favor hable con el administrador'
        });
    }
}

const restablecerPassGet = async(req, res = response) =>{
    const { id, token } = req.params;
    try {
        // Revisar si existe el id en la bd
        const usuario = await Usuario.findById( id );
        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Id inválido',
            })
        }
        //Tenemos un id y usuario válidos
        //Validar el JWT
        const secret = process.env.SECRET_JWT_SEED + usuario.password;
        const payload = jwt.verify(token, secret);
        res.json({
            ok: true,
            msg: 'Restablecer contraseña',
            email: usuario.email,
        });

    } catch (error) {
        console.log(error);
    }
}

const recuperarPass = async (req, res = response) => {
    const { email } = req.body;
    try {
        //Nos aseguramos que el usuario existe en la bd
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        if (usuario.status !== 'Active') {
            return res.status(400).json({
                ok: false,
                msg: 'Es necesario tener una cuenta activa'
            });
        }

        const uid = usuario.id;
        //TODO: Obtener uid y email. Hacer token con la contraseña para que sea de 1 sólo uso
        // Generar un nuevo JWT y retornarlo en esta peticion
        const token = await generarResetJWT(uid, usuario.password);

        const link = `http://localhost:4000/reset-password/${uid}/${token}`;
        //TODO: ENVIAR EL LINK AL EMAIL
        sendRecoverEmail(
            usuario.name,
            email,
            uid, token,
        );
        res.json({
            ok: true,
            msg: 'Recuperar contraseña',
            email,
            link,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

module.exports = {
    recuperarPass,
    restablecerPass,
    // recuperarPassGet,
    restablecerPassGet
}