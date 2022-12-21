const { response } = require("express");
const Casillero = require('../models/Casillero');

const getCasillerosPorUbiYTam = async (req, res = response) => {
    // Tamaños (largo x ancho x alto)
    // S (4.3 x 16 x 25) , M (9.5 x 16 x 25) y L (20 x 16 x 25)

    const numCasilleros = await Casillero
        .find({ 
            ubicacion: req.body.ubicacion.toLowerCase(),
            tamano: req.body.tamano })
        .count();
    
    res.json({
        ok: true,
        numCasilleros
    });
}


module.exports = {
    getCasillerosPorUbiYTam,
}