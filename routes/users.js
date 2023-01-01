/* 
    Ruta de Usuarios / User
    host + /api/user
*/

const { Router } = require('express');
const { actualizarUsuario, getUsuario, getUsuariosByRole, createDeliveryMan, updateDeliveryMan, sendDeliveryManEmail, deleteDeliveryMan, updateDeliveryManStatus } = require('../controllers/users');
const { validarJWT, validarJWTAdmin, validarJWTDeliveryMan } = require('../middlewares/validar-jwt');
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

router.post('/usuarios', validarJWTAdmin, getUsuariosByRole);

router.post('/repartidores/:token', validarJWTDeliveryMan, createDeliveryMan);

router.put('/:id', updateDeliveryMan);

router.post(
    '/repartidores/crear/email',
    sendDeliveryManEmail,
);

router.post(
    '/repartidores/cambiar/status',
    updateDeliveryManStatus,
)

//Borrar usuario
router.delete('/repartidores/:id', deleteDeliveryMan);

module.exports = router;