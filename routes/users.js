/* 
    Ruta de Usuarios
    host + /
*/

const { Router } = require('express');
const { actualizarUsuario } = require('../controllers/users');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
//Tienen que pasar por la validación del JWT

//Actualizar Usuario
//TODO: Añadir checks
router.put('/:id', validarJWT, actualizarUsuario);

module.exports = router;