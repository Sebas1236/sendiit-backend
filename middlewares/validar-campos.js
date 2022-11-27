const { response } = require('express');
const { validationResult } = require('express-validator');
//El next se llama de manera interna en cada check
const validarCampos = (req, res = response, next) => {

    // manejo de errores
    const errors = validationResult( req );
    //Si hay errores
    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();

}

module.exports = {
    validarCampos,
}


