const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {

    return new Promise( (resolve, reject) => {
        const payload = { uid, name };
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'}, (err,token) => {
                if( err ){
                    console.log(err);
                    reject('No se pudo generar el token');
                }

                resolve( token );

            });
    });

};

const generarResetJWT = ( uid, password ) => {
    return new Promise( (resolve, reject) => {
        const payload = { uid, password };
        const secret = process.env.SECRET_JWT_SEED + password
        jwt.sign( payload, secret, {
            expiresIn: '15m'}, (err,token) => {
                if( err ){
                    console.log(err);
                    reject('No se pudo generar el token');
                }

                resolve( token );

            });
    });
};

module.exports = {
    generarJWT,
    generarResetJWT,
};