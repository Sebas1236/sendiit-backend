const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//  Crear el servidor de express 
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Público
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() );

// Rutas
// Autenticación y Registro. Verificar usuario
app.use('/api/auth', require('./routes/auth'));
//Usuario
app.use('/api/user', require('./routes/users'));
//Tarjetas
app.use('/api/cards', require('./routes/cards'));
//Paquetes
app.use('/api/paquetes', require('./routes/paquetes'));
//Casilleros
app.use('/api/casilleros', require('./routes/casilleros'));
// Solicitar cambio de contraseña. Recuperar password
app.use('/', require('./routes/reset'));
// TODO: Login, Crear cuenta

//  Escuchar peticiones
const server = app.listen( process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});

module.exports = server;