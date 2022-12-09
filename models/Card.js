const { Schema, model } = require('mongoose');

const CardSchema = new Schema({
    cardName: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    cardNumber: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    month: {
        type: Number,
        minlength: 1,
        maxlength: 2,
        required: true
    },
    year: {
        type: Number,
        minlength: 1,
        maxlength: 2,
        required: true
    },
    user: {
        //Es una referencia
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }
});

CardSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

//En mongoDb se guarda la colección como cards
module.exports = model('Card', CardSchema );
