const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    // x-token headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { uid, name, role } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        // console.log({uid, name});
        //TODO: AÑADIR VALIDACIONES ADMINISTRADOR

        req.uid = uid;
        req.name = name;
        req.role = role;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido',
        })
    }

    next();
};

const validarJWTAdmin = (req, res = response, next) => {
    // x-token headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { uid, name, role } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        // console.log({uid, name});
        if (role !== 'Administrador') {
            return res.status(401).json({
                ok: false,
                msg: 'Necesita permisos de administrador',
            });
        }

        req.uid = uid;
        req.name = name;
        req.role = role;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido',
        });
    }

    next();
};

const validarJWTDeliveryMan = (req, res = response, next) => {
    // x-token headers
    const token = req.params.token;

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { name, role, last_name, email, phone } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        // console.log(name, role, last_name, email, phone);

        req.phone = phone;
        req.name = name;
        req.role = role;
        req.last_name = last_name;
        req.email = email;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido',
        });
    }

    next();
};

module.exports = {
    validarJWT,
    validarJWTAdmin,
    validarJWTDeliveryMan,
}