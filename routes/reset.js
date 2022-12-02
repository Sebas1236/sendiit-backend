/*
    Rutas para recuperar contraseña /
    host + /forgot-password
    host + /reset-password/:id/:token
*/ 
const { restablecerPass, recuperarPass, restablecerPassGet } = require('../controllers/reset');

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
//TODO: IMPLEMENTAR CHECKS

// Reestablecer contraseña
router.post(
    '/reset-password/:id/:token',
    restablecerPass,
);

module.exports = router;