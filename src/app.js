//asi se importan paquetes en javascript
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

//Importacion de la configuracion de la BBDD
const config = require('./config');

//Importacion de modulos creados por el desarrollador con rutas relativas
const region = require('../modulos/integradora/region');
const ciudad = require('../modulos/integradora/ciudad');
const institucion = require('../modulos/integradora/institucion');
const telefonosInstitucion = require ('../modulos/integradora/telefonosInstitucion');
const equipo = require('../modulos/integradora/equipo');
const participante = require('../modulos/integradora/participante');
const telefonosParticipante = require('../modulos/integradora/telefonosParticipante');
const torneo = require('../modulos/integradora/torneo');
const participantesTorneo = require('../modulos/integradora/participantesTorneo');
const evento = require('../modulos/integradora/evento');
const tablaPuntaje = require('../modulos/integradora/tablaPuntaje');
//const clientes = require('../modulos/clientes/rutas');
//const cisco = require('../modulos/cisco/rutas');

//------- Importacion de las respuestas de red cliente/servidor --------

const leagueZucchiniRouter = require('../modulos/integradora/leagueZucchiniRouter');

//La case express nos permite utilizar métodos de enrutamiento, de respuesta
//y solicitud de métodos de HTTP
const app = express();

//Midleware
//Como usan la funcion "use" entonces se ejecutaran todos estas funcioens
//antes de que se utilice cualquier método http.

//Morgan se encarga de la capa de sesión del modelo OSI y de mantener las
//sesiones. En este caso estamos utilizando el argumento dev que nos
//proporciona mucha más retroalimentación y verbosidad a las cosas que
//sucede dentro de la red y de las peticiones http así como sus errores
app.use(morgan('dev'));

//Este middleware sirve para traducir preámbulos json en objetos javascript
//para que de esa manera pueda ser accesado de manera fácil por nuestros
//programas. El json entrante se guarda en req.body
app.use(express.json());

//Traduce los argumentos que pueden venir desde la URL, que es generalmente
//el método por el cual se transfería información en los formularios html
//con el método http GET. El argumento extended nos permite utilizar otras
//funciones dentro de express para procesar estos argumentos dentro de la URL
//que es más lento pero es más poderoso. La velocidad de procesamiento de
//solicitudes http no es prioridad para nuestro programa
app.use(express.urlencoded({extended: true}));

//Sirve para permitir recibir fetch() en cualquier navegador de la info
//de nuestra base de datos. Es decir, permitimos que cualquier navegador
//pueda acceder a nuestra información. De hay que el argumento de cors sea
//todos los origenes
app.use(cors({
	origin: '*'
}))

app.use(express.static(path.join(__dirname, '../public')));

//Nota, cuando se está utlizando middleware propietario de express, como
//aquellos que deben de llamar una función de la misma clase como
//express.json o exrpess.urlencoded, estos middlewares ya tienen integrados
//por si mismo la función next() para que el sistema no se quede esperando
//y continue con la siguiente función. next() debe de ser escrito de manera
//explícita cuando se usa Node JS Express. Generalmente, también el software
//de tecerceros como cors y morgan tienen integrados por si mismo la funcion
//next y no es necesario poner explícito esa funcion.
//Cuando uno está escribiendo un middleware personalizado o de uno mismo, en
//ese caso sería requerido utilizar la función next() al final.

//Establecemos un puerto para el servidor utilizando el objeto creado por
//la clase express.
app.set('port', config.app.port);

//Aqui se estableceran las rutas de la pagina web.
//app.use('/api/clientes', clientes);
//app.use('/cisco', cisco);

//------------------------ Seccion API ---------------------------
app.use('/api/region/', region);
app.use('/api/ciudad/', ciudad);
app.use('/api/institucion/', institucion);
app.use('/api/institucion/telefonos/', telefonosInstitucion);
app.use('/api/equipo/', equipo);
app.use('/api/participante', participante);
app.use('/api/participante/telefonos/', telefonosParticipante);
app.use('/api/torneo', torneo);
app.use('/api/torneo/participantes', participantesTorneo);
app.use('/api/evento', evento);
app.use('/api/tablaPuntaje', tablaPuntaje);

//---------------- Seccion cliente/servidor ------------------
console.log(leagueZucchiniRouter);
app.use('/', leagueZucchiniRouter);

//Así se exporta en javasscript
module.exports = app;
