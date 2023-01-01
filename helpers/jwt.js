const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name, role ) => {

    return new Promise( (resolve, reject) => {
        const payload = { uid, name, role };
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

const generarDeliveryManJWT = ( name, role, last_name, email, phone ) => {
    return new Promise( (resolve, reject) => {
        const payload = { name, role, last_name, email, phone };
        const secret = process.env.SECRET_JWT_SEED;
        jwt.sign( payload, secret, {
            expiresIn: '60m'}, (err,token) => {
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
    generarDeliveryManJWT,
};