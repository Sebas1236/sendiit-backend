/*
    PAQUETE ROUTERS
    HOST+ /api/paquete
*/
const { getPaquetes, getPaquetesCliente, getPaquete, postPaquete, handleStatusChange } = require('../controllers/paquetes');
const { validarJWT } = require('../middlewares/validar-jwt');

const express = require('express');
const router = express.Router();

router.use(validarJWT);

// GET todos los paquetes
router.get('/', getPaquetes);

// GET todos los paquetes del usuario logeado
router.get('/cliente', getPaquetesCliente);

// GET id un paquete
router.get('/:id', getPaquete);

// POST paquete
router.post('/', postPaquete);

//* Cambiar status del paquete
router.post('/cambiar-status', handleStatusChange);



module.exports = router;