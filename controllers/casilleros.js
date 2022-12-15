const { response } = require("express");
const Casillero = require('../models/Casillero');
const { cabePaquete, tamanoPaquete } = require('../helpers/valTamPaquete');

const getCasillerosPorUbiYTam = async (req, res = response) => {
    // Tamaños (largo x ancho x alto)
    // S (4.3 x 16 x 25) , M (9.5 x 16 x 25) y L (20 x 16 x 25)
    const cabe = cabePaquete(req.body.dimensiones);
    if(!cabe) return res.status(400).send('El paquete no cabe en ningún casillero.');

    // TODO: mejorar esta fuerza bruta si se puede
    const tamano = tamanoPaquete(req.body.dimensiones);

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


module.exports = {
    getCasillerosPorUbiYTam,
}