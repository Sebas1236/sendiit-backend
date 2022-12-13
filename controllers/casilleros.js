const { response } = require("express");
const Casillero = require('../models/Casillero');
const Joi = require('joi');

const getCasillerosPorUbiYTam = async (req, res = response) => {
    // Tamaños (largo x ancho x alto)
    // S (4.3 x 16 x 25) , M (9.5 x 16 x 25) y L (20 x 16 x 25)
    const { error } = validarDimensiones(req.body.dimensiones);
    if(error) return res.status(400).send(error.details[0].message);

    // TODO: mejorar esta fuerza bruta si se puede
    let tamano;
    if(req.body.dimensiones.largo <= 4.3){
        tamano = 'Pequeño';
    } else if (req.body.dimensiones.ancho <= 9.5) {
        tamano = 'Mediano';
    } else {
        tamano = 'Grande';
    }

    const numCasilleros = await Casillero
        .find({ 
            ubicacion: req.body.ubicacion.toLowerCase(),
            tamano })
        .count();
    
    res.json({
        ok: true,
        numCasilleros
    });
}

function validarDimensiones(dimensiones){
    const schema = Joi.object({
        largo: Joi.number().min(0.01).max(20).required(),
        ancho: Joi.number().min(0.01).max(16).required(),
        alto: Joi.number().min(0.01).max(25).required()
    });

    return schema.validate(dimensiones);
}

module.exports = {
    getCasillerosPorUbiYTam,
}