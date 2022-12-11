const { mongoose } = require('mongoose');
const { validarJWT } = require('../../../middlewares/validar-jwt');
const { generarJWT } = require('../../../helpers/jwt');



describe('validar-jwt', () => {
    it('Debe llenar req.uid y req.name con el payload del JWT válido', async () => {
        const usuario = {
            uid: mongoose.Types.ObjectId().toHexString(),
            name: 'name'
        }
        const token = await generarJWT(usuario.uid, usuario.name);
        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = {};
        const next=jest.fn();

        validarJWT(req, res, next);

        // expect(req.uid).toMatchObject(usuario);
        expect(req.uid).toBe(usuario.uid);
        expect(req.name).toBe(usuario.name);
    });

    // 401 si no hay token
    // 401 si el token no es válido

    // it('Debe rechazar promesa si recibe llave primaria vacía', async () => {
    //     // try{
    //         process.env.SECRET_JWT_SEED=s;
    //         await expect(generarJWT()).rejects.toMatch('error');
    //     // }
    //     // catch (err) {
    //     //     expect(err).toMatch('error');
    //     // }
    // });
});