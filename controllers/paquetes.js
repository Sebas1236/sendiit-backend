const { response } = require("express");
const { findByIdAndUpdate } = require("../models/Paquete");
const Paquete = require('../models/Paquete');

const getPaquetes = async (req, res = response) => {
    const paquetes = await Paquete
        .find()
        .populate('casilleroOrigen')
        .populate('casilleroDestino')
        .populate('usuario');
        

    res.json({
        ok: true,
        paquetes
    });
}

const getPaquetesCliente = async (req, res = response) => {
    const paquetes = await Paquete
        .find({ usuario: req.uid })
        .populate('casilleroOrigen')
        .populate('casilleroDestino')
        .populate('usuario');
        

    res.json({
        ok: true,
        paquetes
    });
}

const getPaquete = async (req, res = response) => {
    // TODO: validar que id no esté vacío
    // TODO: validar que id sea válido
    // TODO: validar que halla un paquete con el id dado
    const paquete = await Paquete
        .findById(req.params.id)
        .populate('casilleroOrigen')
        .populate('casilleroDestino')
        .populate('usuario');

    res.json({
        ok: true,
        paquete
    });
}

const postPaquete = async (req, res = response) => {
    // TODO: validar req.body con joi
    // URGENTE: CALCULAR COSTO SEGÚN LA DISTANCIA 
    const paquete = new Paquete({
        casilleroOrigen: req.body.casilleroOrigen,
        casilleroDestino: req.body.casilleroDestino,
        usuario: req.body.usuario,
        destinatario: req.body.destinatario,
        dimensiones: req.body.dimensiones,
        descripcion: req.body.descripcion,
        costo: 350
    });
    try{
        const result = await paquete.save();
        res.json({
            ok: true,
            result
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en crear paquete...'
        });
    }
}

const putPaquete = async (req, res = response) => {
    const paquete = await findByIdAndUpdate( req.params.id, )
}

module.exports = {
    getPaquetes,
    getPaquetesCliente,
    getPaquete,
    postPaquete,
    putPaquete
};