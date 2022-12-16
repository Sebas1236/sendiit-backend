const { response } = require("express");
const { cabePaquete, tamanoPaquete } = require('../helpers/valTamPaquete');
const Casillero = require("../models/Casillero");
const {Usuario} = require("../models/Usuario");
const Paquete = require('../models/Paquete');
const { sendDataPackage } = require('../helpers/nodemailer.config');
const qr= require("qrcode");

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
    // URGENTE: CALCULAR COSTO

    const cabe = cabePaquete(req.body.dimensiones);
    if(!cabe) return res.status(400).send('El paquete no cabe en ningún casillero.');

    const tamano = tamanoPaquete(req.body.dimensiones);

    // El sistema asignará un casillero automáticamente
    // Necesita una ubicacion origen y destino
    const casilleroOrigen = await Casillero
        .findOne({ 
            tamano,
            ubicacion: req.body.origen,
            ocupado: false 
        })
        .select( '_id' );
    
    if(!casilleroOrigen) return res.status(400).send('No hay casilleros disponibles para este paquete');

    const casilleroDestino = await Casillero
        .findOne({ 
            tamano,
            ubicacion: req.body.destino,
            ocupado: false 
        })
        .select( '_id' );

    if(!casilleroDestino) return res.status(400).send('No hay casilleros disponibles para este paquete');
    
    
    const paquete = new Paquete({
        casilleroOrigen,
        casilleroDestino,
        usuario: req.body.usuario,
        destinatario: req.body.destinatario,
        dimensiones: req.body.dimensiones,
        tamano,
        descripcion: req.body.descripcion,
        costo: 350
    });

    const codigo= await qr.toDataURL(paquete.id)
    paquete.qrOrigen=codigo
    console.log(paquete.qrOrigen)
    try{
        const result = await paquete.save();
        res.json({
            ok: true,
            result
        });

         //Leemos el usuario
         const usuario = await Usuario.findById(req.body.usuario).populate('email').populate('name')
         //Enviamos los datos a la funcion para enviar el correo
         sendDataPackage( 
            req.body.origen,
            req.body.destino,
             usuario,
             tamano,
             req.body.destinatario,
             req.body.descripcion,
             codigo
             );

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
    // const paquete = await findByIdAndUpdate( req.params.id, )
}

module.exports = {
    getPaquetes,
    getPaquetesCliente,
    getPaquete,
    postPaquete,
    putPaquete
};