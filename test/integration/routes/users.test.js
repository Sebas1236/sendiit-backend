const mongoose = require('mongoose');
const request = require('supertest');
const { generarJWT } = require('../../../helpers/jwt');
const { Usuario } = require('../../../models/Usuario');

describe('/api/user', () => {
    let server;
    let token;
    let usuario;
    let uid;

    let name;
    let last_name;
    let email;
    let password;

    const exec = () => {
        return request(server)
            .get('/api/user')
            .set('x-token', token)
            .send({ uid });
    }

    beforeEach(async () => { 
        server = require('../../../index'); 

        uid = mongoose.Types.ObjectId().toHexString();
        name = 'aaa';
        last_name = 'aaa';
        email = 'mail@mail.com';
        password = '123456';

        usuario = new Usuario({
            _id: uid,
            name,
            last_name,
            email,
            password
        });
        await usuario.save();

        token = await generarJWT(usuario._id, usuario.name);
    });

    afterEach(async () => {
        await Usuario.deleteMany({});
        await server.close();
    });

    describe('GET /', () => {
        it('Debe retornar error 401 si el usuario no inició sesión', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        // it('Debe retornar error 404 si el id es inváldo', async () => {
        //     uid = '1';

        //     const res = await exec();

        //     expect(res.status).toBe(404);
        // });
        
        // it('Debe retornar error 404 si no hay usuario con el id dado', async () => {
        //     uid = mongoose.Types.ObjectId().toHexString();

        //     const res = await exec();

        //     expect(res.status).toBe(404);
        // });
        
        it('Debe retornar json con el objeto usuario si el id es válido', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.ok).toBe(true);
            expect(res.body).toHaveProperty('usuario._id');
            expect(res.body).toHaveProperty('usuario.name', name);
            expect(res.body).toHaveProperty('usuario.last_name', last_name);
            expect(res.body).toHaveProperty('usuario.email', email);
            expect(res.body).toHaveProperty('usuario.password', password);
        });
    });

    describe('POST /', () => {
        it('Debe retornar error 401 si el usuario no inició sesión', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        // it('Debe retornar error 404 si el id es inváldo', async () => {
        //     uid = '1';

        //     const res = await exec();

        //     expect(res.status).toBe(404);
        // });

        // it('Debe retornar error 404 si no hay usuario con el id dado', async () => {
        //     uid = mongoose.Types.ObjectId().toHexString();

        //     const res = await exec();

        //     expect(res.status).toBe(404);
        // });

        // Aquí se prueban las validaciones 

        
    });
});