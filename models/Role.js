const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({
    role: {
        type: String,
        default: 'Cliente',
        required: [true, 'El rol es obligatorio']
    },
});

module.exports = model('Role', RoleSchema);