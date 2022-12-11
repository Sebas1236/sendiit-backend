const mongoose = require('mongoose');
const request = require('supertest');
const { generarJWT } = require('../../../helpers/jwt');
const { Usuario } = require('../../../models/Usuario');

describe('validar-jwt middleware', () => {
    let server;
    let token;
    let usuario;
    let uid;

    const exec = () => {
        return request(server)
            .get('/api/user')
            .set('x-token', token)
            .send({ uid });
    }

    beforeEach(async () => { 
        server = require('../../../index');

        uid = mongoose.Types.ObjectId().toHexString();

        usuario = new Usuario({
            _id: uid,
            name: 'aaa',
            last_name: 'aaa',
            email: 'mail@mail.com',
            password: '123456'
        }); 

        await usuario.save();

        token = await generarJWT(usuario._id, usuario.name);
    });

    afterEach(async () => {
        await Usuario.deleteMany({});
        await server.close();
    });

    it('Debe retornar error 401 si el token está vacío', async () => {
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('Debe retornar error 401 si el token no es válido', async () => {
        token = 'a';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('Debe retornar 200 si el token es válido', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
    });
});

