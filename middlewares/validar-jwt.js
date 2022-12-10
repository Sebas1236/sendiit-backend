const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res=response, next ) => {
    // x-token headers
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { uid, name, last_name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        // console.log({uid, name});

        req.uid = uid;
        req.name = name;
        req.last_name = last_name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido',
        })
    }

    next();
}

module.exports = {
    validarJWT,
}