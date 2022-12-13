/* 
    Ruta de Usuarios / User
    host + /api/user
*/

const { Router } = require('express');
const { actualizarUsuario, getUsuario } = require('../controllers/users');
const { validarJWT } = require('../middlewares/validar-jwt');
const validarObjectId = require('../middlewares/validar-objectid');
const router = Router();
//Tienen que pasar por la validación del JWT

//Actualizar Usuario
//TODO: Añadir checks
router.get( // Obtiene el usuario que hace esta petición get
    '/', 
    validarJWT,
    // validarObjectId,
    getUsuario
);

router.post('/profile', validarJWT, actualizarUsuario);

module.exports = router;