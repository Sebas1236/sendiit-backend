const { response } = require("express");
const Casillero = require('../models/Casillero');

const getCasillerosPorUbiYTam = async (req, res = response) => {
    // Tamaños (largo x ancho x alto)
    // S (4.3 x 16 x 25) , M (9.5 x 16 x 25) y L (20 x 16 x 25)

    const numCasilleros = await Casillero
        .find({ 
            ubicacion: req.body.ubicacion.toLowerCase(),
            tamano: req.body.tamano,
            ocupado: false
        })
        .count();
    
    res.json({
        ok: true,
        numCasilleros
    });
}

const getAllPorTam = async (req, res = response) => {
    // Tamaños (largo x ancho x alto)
    // S (4.3 x 16 x 25) , M (9.5 x 16 x 25) y L (20 x 16 x 25)
    let numCasilleros = [];
    let num;

    const ubicaciones = await Casillero
        .find()
        .distinct('ubicacion');

    for(let i=0; i<ubicaciones.length; i++){
        num = await Casillero
            .find({
                ubicacion: ubicaciones[i],
                tamano: req.body.tamano,
                ocupado: false
            })
            .count();
        numCasilleros[i] = num;
    }
    
    res.json({
        ok: true,
        ubicaciones, 
        numCasilleros
    });
}


module.exports = {
    getCasillerosPorUbiYTam,
    getAllPorTam
}