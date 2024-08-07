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
const nivelEscolaridad = require('../modulos/integradora/nivelEscolaridad');
const turno = require('../modulos/integradora/turno');
const sostenimiento = require('../modulos/integradora/sostenimiento');
const equipo = require('../modulos/integradora/equipo');
const participante = require('../modulos/integradora/participante');
const tipoCompeticion = require('../modulos/integradora/tipoCompeticion');
const competicion = require('../modulos/integradora/competicion');
const competicionParticipantes = require('../modulos/integradora/competicionParticipantes');
const competicionCombinadaParticipantes = require('../modulos/integradora/competicionCombinadaParticipantes');
const competicionEliminacionDirectaParticipante = require('../modulos/integradora/competicionEliminacionDirectaParticipante')
const evento = require('../modulos/integradora/evento');
const tablaPuntaje = require('../modulos/integradora/tablaPuntaje');
const usuario = require('../modulos/integradora/usuario');
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
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

//NOTA: fue añadido el campo 'methods' para permitir todos los métodos
//de solicitudes http en la lista

//This is used when the http method has a header with Content-Type: 
//applicatoin/json, becuase the browser will send a preflight OPTIONS
//to check if this servrer can handle this kind of requests
app.options('*', cors());

//Express viene con una función consigo en el que permite utilizar rutas
//dentro del mismo S.O. para que puedan ser accedidas desde el exterior
//y por navegadores. Esta ruta es pública y se utiliza principalmente
//para todo lo que es el frontend.
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

/*app.all('*', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
 res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
});*/

//Aqui se estableceran las rutas de la pagina web.
//app.use('/api/clientes', clientes);
//app.use('/cisco', cisco);

//------------------------ Seccion API ---------------------------
app.use('/api/region/', region);
app.use('/api/ciudad/', ciudad);
app.use('/api/institucion/', institucion);
app.use('/api/nivelEscolaridad', nivelEscolaridad);
app.use('/api/turno', turno);
app.use('/api/sostenimiento', sostenimiento);
app.use('/api/equipo/', equipo);
app.use('/api/participante', participante);
app.use('/api/competicion', competicion);
app.use('/api/competicion/tipos', tipoCompeticion);
app.use('/api/competicion/participantes', competicionParticipantes);
app.use('/api/competicion/combinada/participantes', competicionCombinadaParticipantes)
app.use('/api/competicion/eliminacionDirecta/participantes', competicionEliminacionDirectaParticipante)
app.use('/api/evento', evento);
app.use('/api/tablaPuntaje', tablaPuntaje);
app.use('/api/usuarioTest/', usuario);

//---------------- Seccion cliente/servidor ------------------
app.use('/', leagueZucchiniRouter);

//Así se exporta en javasscript
module.exports = app;
