/* 
    Ruta de Usuarios / User
    host + /api/user
*/

const { Router } = require('express');
const { actualizarUsuario, getUsuario } = require('../controllers/users');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
//Tienen que pasar por la validación del JWT

//Actualizar Usuario
//TODO: Añadir checks
router.post(
    '/', 
    validarJWT, 
    getUsuario
);
router.post('/profile', validarJWT, actualizarUsuario);

module.exports = router;