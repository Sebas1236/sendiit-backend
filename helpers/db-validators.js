const Role = require("../models/Role");

const isRoleValid = async (role = 'Cliente') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
};

module.exports = {
    isRoleValid,
}