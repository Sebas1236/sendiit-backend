/*
    CASILLERO ROUTERS
    HOST+ /api/paquete
*/
require('../controllers/casilleros');

const express = require('express');
const router = express.Router();

const { getCasillerosPorUbiYTam, getAllPorTam} = require('../controllers/casilleros');
const { validarJWT } = require('../middlewares/validar-jwt');

router.use(validarJWT);

// GET # de casilleros disponibles dada una ubicación y el tamaño
// router.get('/', getCasillerosPorUbiYTam);

// GET casilleros disponibles dado un tamaño
router.post('/', getAllPorTam);

module.exports = router;