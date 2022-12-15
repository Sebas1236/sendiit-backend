const mongoose = require('mongoose');
const request = require('supertest');
const { generarJWT } = require('../../../helpers/jwt');
const Casillero = require('../../../models/Casillero');
const { Usuario } = require('../../../models/Usuario');

describe('/api/casilleros', () => {
    let server;
    let casillero;
    let usuario;
    let _id;
    let token;
    let ubicacion;
    let largo;
    let ancho;
    let alto;

    const exec = () => {
        return request(server)
            .get('/api/casilleros')
            .set('x-token', token)
            .send({
                ubicacion,
                dimensiones: {
                    largo,
                    ancho,
                    alto
                }
            });
    }

    beforeEach(async () => { 
        server = require('../../../index'); 
        _id = mongoose.Types.ObjectId().toHexString();
        name = 'aaa';
        usuario = new Usuario({
            _id,
            name,
            last_name: 'aaa',
            email: 'mail@mail.com',
            password: '123456'
        });
        await usuario.save();

        casillero = new Casillero({
            tamano: 'Pequeño',
            ubicacion: 'santa fe'
        });
        await casillero.save();

        token = await generarJWT(_id, name);
    });

    afterEach(async () => {
        await Casillero.deleteMany({});
        await Usuario.deleteMany({});
        await server.close();
    });
    
    describe('GET /', () => {
        it('Debe retornar error 401 si el usuario no inició sesión', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        // Aquí van todas las pruebas de validacion con joi

        it('Debe retornar número de correspondencias de casilleros pequeños si las dimensiones corresponden y el input es válido', async () => {
            ubicacion = 'santa fe';
            largo = 1;
            ancho = 1;
            alto = 1;

            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.ok).toBe(true);
            expect(res.body).toHaveProperty('numCasilleros', 1);
        });

        // it('Debe retornar número de correspondencias de casilleros medianos si las dimensiones corresponden y el input es válido', async () => {
        //     ubicacion = 'santa fe';
        //     largo = 4.4;
        //     ancho = 1;
        //     alto = 1;

        //     const res = await exec();

        //     expect(res.status).toBe(200);
        //     expect(res.ok).toBe(true);
        //     expect(res.body).toHaveProperty('numCasilleros', 1);
        // });

        // it('Debe retornar número de correspondencias de casilleros grandes si las dimensiones corresponden y el input es válido', async () => {
        //     ubicacion = 'santa fe';
        //     largo = 1;
        //     ancho = 1;
        //     alto = 1;

        //     const res = await exec();

        //     expect(res.status).toBe(200);
        //     expect(res.ok).toBe(true);
        //     expect(res.body).toHaveProperty('numCasilleros', 1);
        // });
    });
});