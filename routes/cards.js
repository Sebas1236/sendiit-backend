/*
    CARD ROUTERS
    HOST+ /api/cards
*/

const { Router } = require("express");
const { check } = require('express-validator');
const { getCreditCards, createCreditCard, updateCreditCard, deleteCreditCard } = require("../controllers/cards");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();
//TODO: CHECKS PARA VALIDAR
// Todas tienen que pasar por la validación del JWT
router.use(validarJWT);
//Obtener tarjetas
router.get('/', getCreditCards);

//Crear una nueva tarjeta
router.post(
    '/',
    [
        check('cardName', 'El nombre del titular de la tarjeta es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createCreditCard
);

//Actualizar tarjeta
router.put('/:id', updateCreditCard);

//Borrar tarjeta
router.delete('/:id', deleteCreditCard);

module.exports = router;