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

const individualRegion = ( { id } ) => {
	return region.individualRegion(conexion, id);
}

const addRegion = ( { nombreRegion } ) => {
	return region.addRegion(conexion, nombreRegion);
}

const delRegion = ( { idRegion: id } ) => {
	return region.delRegion(conexion, id);
}

const updateRegion = ( { idRegion: id, nombreRegion } ) => {
	return region.updateRegion(conexion, id, nombreRegion);
}


//--------------- CONTROLADOR CIUDAD --------------

const ciudad = require('./ciudadsql');

const allCiudad = () => {
	return ciudad.allCiudad(conexion);
}

const individualCiudad = ( { id } ) => {
	return ciudad.individualCiudad(conexion, id);
}

const addCiudad = ( { nombreCiudad, idRegion } ) => {
	return ciudad.addCiudad(conexion, nombreCiudad, idRegion);
}

const delCiudad = ( { idCiudad: id } ) => {
	return ciudad.delCiudad(conexion, id);
}

const updateCiudad = ( { idCiudad: id, nombreCiudad, idRegion } ) => {
	return ciudad.updateCiudad(conexion, id, nombreCiudad, idRegion);
}

//-------------- CONTROLADOR INSTITUCION ----------

const institucion = require('./institucionsql');

const allInstitucion = () => {
	return institucion.allInstitucion(conexion);
}

const individualInstitucion = ( { id } ) => {
	return institucion.individualInstitucion(conexion, id);
}

const addInstitucion = ( {
	nombreInstitucion,
	direccionInstitucion,
	nInstitucionPais,
	cct,
	idNivelEscolaridad,
	idTurno,
	idSostenimiento,
	paginaWebInstitucion,
	idCiudad
} ) => {
	return institucion.addInstitucion(conexion, nombreInstitucion, direccionInstitucion, nInstitucionPais, cct, idNivelEscolaridad, idTurno, idSostenimiento, paginaWebInstitucion, idCiudad);
}

const delInstitucion = ( { idInstitucion: id } ) => {
	return institucion.delInstitucion(conexion, id);
}

const updateInstitucion = ( {
	idInstitucion : id,
	nombreInstitucion,
	direccionInstitucion,
	nInstitucionPais,
	cct,
	idNivelEscolaridad,
	idTurno,
	idSostenimiento,
	paginaWebInstitucion,
	idCiudad
} ) => {
	return institucion.updateInstitucion(conexion,id, nombreInstitucion, direccionInstitucion, nInstitucionPais, cct, idNivelEscolaridad, idTurno, idSostenimiento, paginaWebInstitucion, idCiudad);
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

const individualEquipo = ( { id } ) => {
	return equipo.individualEquipo(conexion, id);
}

const addEquipo = ( { grado, grupo, nombreGrupo, idInstitucion } ) => {
	return equipo.addEquipo(conexion, grado, grupo, nombreGrupo, idInstitucion);
}

const delEquipo = ( { idEquipo: id } ) => {
	return equipo.delEquipo(conexion, id);
}

const updateEquipo = ( { idEquipo: id, grado, grupo, nombreGrupo, idInstitucion } ) => {
	return equipo.updateEquipo(conexion, id, grado, grupo, nombreGrupo, idInstitucion);
}
 
//-------------- CONTROLADOR PARTICIPANTE --------

const participante = require('./participantesql');

const allParticipante = () => {
	return participante.allParticipante(conexion);
}

const individualParticipante = ( { id } ) => {
	return participante.individualParticipante(conexion, id);
}

const addParticipante = ( {
	nombreParticipante,
	fechaNacimientoParticipante,
	direccionParticipante,
	nss,
	autorizacionAdulto,
	enfermedadesParticipante,
	medicamentosParticipante,
	operacionesParticipante,
	idEquipo
} ) => {
	return participante.addParticipante(conexion, nombreParticipante, fechaNacimientoParticipante, direccionParticipante, nss, autorizacionAdulto, enfermedadesParticipante, medicamentosParticipante, operacionesParticipante, idEquipo);
}

const delParticipante = ( { idParticipante: id } ) => {
	return participante.delParticipante(conexion, id);
}

const updateParticipante = ({
	idParticipante: id,
	nombreParticipante,
	fechaNacimientoParticipante,
	direccionParticipante,
	nss,
	autorizacionAdulto,
	enfermedadesParticipante,
	medicamentosParticipante,
	operacionesParticipante,
	idEquipo
}) => {
	return participante.updateParticipante(conexion, id, nombreParticipante, fechaNacimientoParticipante, direccionParticipante, nss, autorizacionAdulto, enfermedadesParticipante, medicamentosParticipante, operacionesParticipante, idEquipo);
}

//---- CONTROLADOR TELEFONOS PARTICIPANTES ----

const telefonosParticipante = require('./telefonosParticipantesql');

const allTelefonosParticipante = () => {
	return telefonosParticipante.allTelefonosParticipante(conexion);
}

//---------CONTROLADOR TIPO COMPETICION-----------

const tipoCompeticion = require('./tipoCompeticionsql');

const allTipoCompeticion = () => {
	return tipoCompeticion.allTipoCompeticion(conexion);
}

//----------- CONTROLADOR COMPETICION -------------

const competicion = require('./competicionsql');

const allCompeticion = () => {
	return competicion.allCompeticion(conexion);
}

//------------- CONTROLADOR EVENTO --------------

const evento = require('./eventosql');

const allEvento = () => {
	return evento.allEvento(conexion);
}

//--- CONTROLADOR COMPETICION PARTICIPANTES ---

const competicionParticipantes = require('./competicionParticipantessql');

const allCompeticionParticipantes = () => {
	return competicionParticipantes.allCompeticionParticipantes(conexion);
}

// CONTROLADOR COMPETICION COMBINADA PARTICIPANTES

const competicionCombinadaParticipantes = require('./competicionCombinadaParticipantessql');

const allCompeticionCombinadaParticipantes = () => {
	return competicionCombinadaParticipantes.allCompeticionCombinadaParticipantes(conexion);
}

//--------- CONTROLADOR TABLA PUNTAJE ----------

const tablaPuntaje = require('./tablaPuntajesql.js');

const allTablaPuntaje = () => {
	return tablaPuntaje.allTablaPuntaje(conexion);
}

//------------- CONTROLADOR USUARIO ------------

const usuario =  require('./usuariosql.js');

const allUsuario = () => {
	return usuario.allUsuario(conexion);
}

const loginUsuario = ({ nombreUsuario, contraseniaUsuario: contrasenia }) => {
	return usuario.loginUsuario(conexion, nombreUsuario, contrasenia)
}

const addUsuario = ({
	nombreUsuario,
	contraseniaUsuario: contrasenia,
	correoUsuario: correo,
	nTelefonoUsuario: nTelefono,
	fotoPerfiUsuario: fotoPerfil
}) => {
	return usuario.addUsuario(conexion, nombreUsuario, contrasenia, correo, nTelefono, fotoPerfil);
}

const delUsuario = ({ idUsuario }) => {
	return usuario.delUsuario(conexion, idUsuario);
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
		individualRegion,
		addRegion,
		delRegion,
		updateRegion
	},
	ciudad: {
		allCiudad,
		individualCiudad,
		addCiudad,
		delCiudad,
		updateCiudad
	},
	institucion: {
		allInstitucion,
		individualInstitucion,
		addInstitucion,
		delInstitucion,
		updateInstitucion
	},
	telefonosInstitucion: {
		allTelefonosInstitucion,
	},
	equipo: {
		allEquipo,
		individualEquipo,
		addEquipo,
		delEquipo,
		updateEquipo
	},
	participante: {
		allParticipante,
		individualParticipante,
		addParticipante,
		delParticipante,
		updateParticipante
	},
	telefonosParticipante: {
		allTelefonosParticipante,
	},
	tipoCompeticion: {
		allTipoCompeticion,
	},
	competicion: {
		allCompeticion,
	},
	evento: {
		allEvento,
	},
	competicionParticipantes: {
		allCompeticionParticipantes,
	},
	competicionCombinadaParticipantes: {
		allCompeticionCombinadaParticipantes,
	},
	tablaPuntaje: {
		allTablaPuntaje,
	},
	usuario: {
		allUsuario,
		loginUsuario,
		addUsuario,
		delUsuario
	}
}
