const { response } = require("express");
const Card = require('../models/Card');

const getCreditCards = async (req, res = response) => {
    // console.log(req.uid);
    const creditCards = await Card.find({user: req.uid})
                                                .populate('user', 'name');

    res.json({
        ok: true,
        creditCards,
    })
}

const createCreditCard = async (req, res = response) => {

    //TODO: VALIDAR QUE SEA ÚNICO EL NÚMERO DE TARJETA
    const creditCard = new Card( req.body );
    try {

        creditCard.user = req.uid;

        const savedCard = await creditCard.save();

        res.json({
            ok: true,
            savedCard,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en crear tarjeta...'
        });
    }
}

//TODO: ACTUALIZAR SOLO cardName, month y year
const updateCreditCard = async(req, res = response) => {
    const { cardName, cardNumber, month, year } = req.body;
    const creditCardId = req.params.id;
    // console.log(cardName);
    try {

        //Verificar si existe
        const card = await Card.findById(creditCardId);
        if (!card) {
            return res.status(404).json({
                ok: false,
                msg: 'card no existe por ese id'
            });
        }
        card.cardName = cardName;
        card.cardNumber = cardNumber;
        card.month = month;
        card.year = year;

        const cardActualizado = await card.save();
        // console.log(cardActualizado);
        res.json({
            ok: true,
            cardActualizado,
            creditCardId,
        })

    } catch (error) {
        console.log(error);
        //Problema interno
        res.status(500).json({
            ok: false,
            msg: 'Error actualizando tarjeta'
        });
    }
}

const deleteCreditCard = async(req, res = response) => {
    const creditCardId = req.params.id;
    try {
        const card = await Card.findById( creditCardId );

        if(!card){
            return res.status(400).json({
                ok: false,
                msg: 'Tarjeta no existe por ese id'
            });
        }

        await Card.findByIdAndDelete( creditCardId );

        res.json({
            ok: true,
        })
        

    } catch (error) {
        console.log(error);
        //Problema interno
        res.status(500).json({
            ok: false,
            msg: 'Error eliminando tarjeta'
        });
    }

}

module.exports = {
    getCreditCards,
    createCreditCard,
    updateCreditCard,
    deleteCreditCard,
}