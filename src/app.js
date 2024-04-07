//asi se importan paquetes en javascript
const express = require("express");
const config = require('./config');
const clientes = require('../modulos/clientes/rutas');
const morgan = require('morgan');
const cors = require('cors');

//Se instancia un objeto de la clase express, recien importada
const app = express();

//Midleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
	origin: '*'
}))

//Establecemos un puerto para el servidor utilizando el objeto creado por
//la clase express.
app.set('port', config.app.port);

//Aqui se estableceran las rutas de la pagina web.
app.use('/api/clientes', clientes);

module.exports = app;
