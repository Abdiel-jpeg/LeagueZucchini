const mysql = require('mysql2');
const config = require('../config');

const dbconfig = {
	host: config.mysql.host,
	port: config.mysql.dbport,
	user: config.mysql.user,
	password: config.mysql.password,
	database: config.mysql.database,
}

let conexion;

const conMysql = () => {
	conexion = mysql.createConnection(dbconfig);
	conexion.connect((err) => {
		if(err) {
			console.log('[db err]', err);
			setTimeout(conMysql(), 200);
		} else {
			console.log('DB Conectada!!!');
		}
	});

	conexion.on('error', err => {	
		console.log('[db err]', err);
		if(err.code == 'PROTOCOL_CONNECTION_LOST') {
			conMysql();
		} else {
			throw err;
		}
	})
}

conMysql();

//--------------- CONTROLADOR REGION ---------------

const region = require('./regionsql');

const allRegion = () => {
	return region.allRegion(conexion);
}


//--------------- CONTROLADOR CIUDAD --------------

const ciudad = require('./ciudadsql');

const allCiudad = () => {
	return ciudad.allCiudad(conexion);
}

//-------------- CONTROLADOR INSTITUCION ----------

const institucion = require('./institucionsql');

const allInstitucion = () => {
	return institucion.allInstitucion(conexion);
}

//------ CONTROLADOR TELEFONOS INSTITUCION -------

const telefonosInstitucion = require('./telefonosInstitucionsql');

const allTelefonosInstitucion = () => {
	return telefonosInstitucion.allTelefonosInstitucion(conexion);
}

//-------------- CONTROLADOR EQUIPO -------------

const equipo = require('./equiposql');

const allEquipo = () => {
	return equipo.allEquipo(conexion);
}

//-------------- CONTROLADOR PARTICIPANTE --------

const participante = require('./participantesql');

const allParticipante = () => {
	return participante.allParticipante(conexion);
}

//---- CONTROLADOR TELEFONOS PARTICIPANTES ----

const telefonosParticipante = require('./telefonosParticipantesql');

const allTelefonosParticipante = () => {
	return telefonosParticipante.allTelefonosParticipante(conexion);
}

//-------------- CONTROLADOR TORNEO -------------

const torneo = require('./torneosql');

const allTorneo = () => {
	return torneo.allTorneo(conexion);
}

//------------- CONTROLADOR EVENTO --------------

const evento = require('./eventosql');

const allEvento = () => {
	return evento.allEvento(conexion);
}

//------ CONTROLADOR PARTICIPANTES TORNEO -------

const participantesTorneo = require('./participantesTorneosql');

const allParticipantesTorneo = () => {
	return participantesTorneo.allParticipantesTorneo(conexion);
}

//--------- CONTROLADOR TABLA PUNTAJE ----------

const tablaPuntaje = require('./tablaPuntajesql.js');

const allTablaPuntaje = () => {
	return tablaPuntaje.allTablaPuntaje(conexion);
}



/*
const all = (tabla) => {
	const sql = 'SELECT * FROM ' + tabla;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

const individual = (tabla, id) => {
	const sql = 'SELECT * FROM ' + tabla + ' WHERE idTask = ' + id;
	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	});

}

const add = (tabla, body) => {
	const sql = 'INSERT INTO '+tabla+' (complecion, titulo, idPrioridad, fecha) VALUES ('+body.complecion+', "'+body.titulo+'", '+body.idPrioridad+', '+body.fecha+')';

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return (error) ? reject(error) : resolve(result);
		});
	})
}

const del = (tabla, body) => {
	const sql = 'DELETE FROM ' + tabla + ' WHERE idTask = ' + body.idTask;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {

		return error ? reject(error) : resolve(result);
		})
	})
}

const update = (tabla, body) => {
	const sql = 'UPDATE '+tabla+' SET complecion='+body.complecion+', titulo="'+body.titulo+'", idPrioridad='+body.idPrioridad+', fecha='+body.fecha+' WHERE idTask='+body.idTask;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	all,
	individual,
	add,
	del,
	update,
}
*/

//------------- EXPORTACION MODULOS -------------------
module.exports = {
	region: {
		allRegion,
	},
	ciudad: {
		allCiudad,
	},
	institucion: {
		allInstitucion,
	},
	telefonosInstitucion: {
		allTelefonosInstitucion,
	},
	equipo: {
		allEquipo,
	},
	participante: {
		allParticipante,
	},
	telefonosParticipante: {
		allTelefonosParticipante,
	},
	torneo: {
		allTorneo,
	},
	evento: {
		allEvento,
	},
	participantesTorneo: {
		allParticipantesTorneo,
	},
	tablaPuntaje: {
		allTablaPuntaje,
	}
}
