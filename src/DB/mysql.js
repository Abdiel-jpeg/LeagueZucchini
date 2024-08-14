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

const allRegion = ( { limit, offset } ) => {
	return region.allRegion(conexion, limit, offset);
}

const searchRegion = ( { nombreRegion: busqueda, limit, offset } ) => {
	return region.searchRegion(conexion, busqueda, limit, offset);
}

const addRegion = ( { nombreRegion } ) => {
	return region.addRegion(conexion, nombreRegion);
}

const delRegion = ( { nombreRegion } ) => {
	return region.delRegion(conexion, nombreRegion);
}

const updateRegion = ( { nuevoNombreRegion, nombreRegion } ) => {
	return region.updateRegion(conexion, nuevoNombreRegion, nombreRegion);
}


//--------------- CONTROLADOR CIUDAD --------------

const ciudad = require('./ciudadsql');

const allCiudad = ( { limit, offset } ) => {
	return ciudad.allCiudad(conexion, limit, offset);
}

const allCiudadPerRegion = ( { nombreRegion } ) => {
	return ciudad.allCiudadPerRegion(conexion, nombreRegion);
}

const searchCiudad = ( { nombreCiudad: busqueda, limit, offset } ) => {
	return ciudad.searchCiudad(conexion, busqueda, limit, offset);
}

const addCiudad = ( { nombreCiudad, nombreRegion } ) => {
	return ciudad.addCiudad(conexion, nombreCiudad, nombreRegion);
}

const delCiudad = ( { nombreCiudad, nombreRegion } ) => {
	return ciudad.delCiudad(conexion, nombreCiudad, nombreRegion);
}

const updateCiudad = ( { nuevoNombreCiudad, nuevoNombreRegion, nombreCiudad, nombreRegion } ) => {
	return ciudad.updateCiudad(conexion, nuevoNombreCiudad, nuevoNombreRegion, nombreCiudad, nombreRegion);
}

//-------------- CONTROLADOR INSTITUCION ----------

const institucion = require('./institucionsql');

const allInstitucion = ( { limit, offset } ) => {
	return institucion.allInstitucion(conexion, limit, offset);
}

const allInstitucionPerCiudad = ( { nombreCiudad } ) => {
	return institucion.allInstitucionPerCiudad(conexion, nombreCiudad);
}

const searchInstitucion = ( { nombreInstitucion, limit, offset } ) => {
	return institucion.searchInstitucion(conexion,nombreInstitucion, limit, offset)
}

const addInstitucion = ( {
	nombreInstitucion,
	direccionInstitucion,
	nInstitucionPais,
	cct,
	nombreNivelEscolaridad,
	nombreTurno,
	nombreSostenimiento,
	paginaWebInstitucion,
	institucionTelefono1,
	institucionTelefono2,
	nombreCiudad
} ) => {
	return institucion.addInstitucion(conexion, nombreInstitucion, direccionInstitucion, nInstitucionPais, cct, nombreNivelEscolaridad, nombreTurno, nombreSostenimiento, paginaWebInstitucion, institucionTelefono1, institucionTelefono2, nombreCiudad);
}

const delInstitucion = ( { nombreInstitucion } ) => {
	return institucion.delInstitucion(conexion, nombreInstitucion);
}

const updateInstitucion = ( {
	antiguoNombreInstitucion,
	nombreInstitucion,
	direccionInstitucion,
	nInstitucionPais,
	cct,
	nombreNivelEscolaridad,
	nombreTurno,
	nombreSostenimiento,
	paginaWebInstitucion,
	institucionTelefono1,
	institucionTelefono2,
	nombreCiudad
} ) => {
	return institucion.updateInstitucion(conexion, antiguoNombreInstitucion, nombreInstitucion, direccionInstitucion, nInstitucionPais, cct, nombreNivelEscolaridad, nombreTurno, nombreSostenimiento, paginaWebInstitucion, institucionTelefono1, institucionTelefono2, nombreCiudad);
}

//------- CONTROLADOR NIVEL ESCOLARIDAD	--------

const nivelEscolaridad = require('./nivelEscolaridadsql');

const allNivelEscolaridad = () => {
	return nivelEscolaridad.allNivelEscolaridad(conexion)
}

//-------------- CONTROLADOR TURNO --------------

const turno = require('./turnosql');

const allTurno = () => {
	return turno.allTurno(conexion);
}

//---------- CONTROLADOR SOSTENIMIENTO -----------

const sostenimiento = require('./sostenimientosql');

const allSostenimiento = () => {
	return sostenimiento.allSostenimiento(conexion);
}


//-------------- CONTROLADOR EQUIPO -------------

const equipo = require('./equiposql');

const allEquipo = ( { limit, offset } ) => {
	return equipo.allEquipo(conexion, limit, offset);
}

const searchEquipoPerInstitucion = ( { nombreInstitucion, limit, offset } ) => {
	return equipo.searchEquipoPerInstitucion(conexion, nombreInstitucion, limit, offset)
}

const addEquipo = ( { grado, grupo, nombreGrupo, nombreInstitucion } ) => {
	return equipo.addEquipo(conexion, grado, grupo, nombreGrupo, nombreInstitucion);
}

const delEquipo = ( { idEquipo: id } ) => {
	return equipo.delEquipo(conexion, id);
}

const updateEquipo = ( { idEquipo: id, grado, grupo, nombreGrupo, nombreInstitucion } ) => {
	return equipo.updateEquipo(conexion, id, grado, grupo, nombreGrupo, nombreInstitucion);
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

//---------CONTROLADOR TIPO COMPETICION-----------

const tipoCompeticion = require('./tipoCompeticionsql');

const allTipoCompeticion = () => {
	return tipoCompeticion.allTipoCompeticion(conexion);
}


//----------- CONTROLADOR COMPETICION -------------

const competicion = require('./competicionsql');

const allCompeticion = ( { limit, offset } ) => {
	return competicion.allCompeticion(conexion, limit, offset);
}

const searchCompeticion = ( { nombreCompeticion: busqueda, limit, offset } ) => {
	return competicion.searchCompeticion(conexion, busqueda, limit, offset);
}

const addCompeticion = ( { nombreCompeticion, descripcionCompeticion, nombreTipoCompeticion } ) => {
	return competicion.addCompeticion(conexion, nombreCompeticion, descripcionCompeticion, nombreTipoCompeticion);
}

const delCompeticion = ( { idCompeticion: id } ) => {
	return competicion.delCompeticion(conexion, id);
}

const updateCompeticion = ({
	idCompeticion: id,
	nombreCompeticion,
	descripcionCompeticion,
	nombreTipoCompeticion
}) => {
	return competicion.updateCompeticion(conexion, id, nombreCompeticion, descripcionCompeticion, nombreTipoCompeticion);
}

//------------- CONTROLADOR EVENTO --------------

const evento = require('./eventosql');

const allEvento = () => {
	return evento.allEvento(conexion);
}

const getEventoPerCompeticion = ( { nombreCompeticion, limit, offset } ) => {
	return evento.getEventoPerCompeticion(conexion, nombreCompeticion, limit, offset)
}

const addEvento = ( { nombreEvento, idCompeticionEliminacionDirectaParticipante, idEquipo1, idEquipo2, faseActual, nombreCompeticion } ) => {
	return evento.addEvento(conexion, nombreEvento, idCompeticionEliminacionDirectaParticipante, idEquipo1, idEquipo2, faseActual, nombreCompeticion);
}

const delEvento = ( { nombreCompeticion } ) => {
	return evento.delEvento(conexion, nombreCompeticion);
}

const updateEvento = ( query ) => {
	return evento.updateEvento(conexion, query);
}

//--- CONTROLADOR COMPETICION PARTICIPANTES ---

const competicionParticipantes = require('./competicionParticipantessql');

const allCompeticionParticipantes = ( { nombreCompeticion } ) => {
	return competicionParticipantes.allCompeticionParticipantes(conexion, nombreCompeticion);
}

const addCompeticionParticipantes = ( { nombreCompeticion, idEquipo } ) => {
	return competicionParticipantes.addCompeticionParticipantes(conexion, nombreCompeticion, idEquipo);
}

const delCompeticionParticipantes = ( { nombreCompeticion, idEquipo } ) => {
	return competicionParticipantes.delCompeticionParticipantes(conexion, nombreCompeticion, idEquipo);
}

// CONTROLADOR COMPETICION COMBINADA PARTICIPANTES

const competicionCombinadaParticipantes = require('./competicionCombinadaParticipantessql');

const allCompeticionCombinadaParticipantes = () => {
	return competicionCombinadaParticipantes.allCompeticionCombinadaParticipantes(conexion);
}

// CONTROLADOR COMPETICION ELIMINACION DIRECTA PARTICIPANTE

const competicionEliminacionDirectaParticipante = require('./competicionEliminacionDirectaParticipantesql');

const perCompeticionEliminacionDirectaParticipante = ( params ) => {
	return competicionEliminacionDirectaParticipante.perCompeticionEliminacionDirectaParticipante(conexion, params);
}

const addCompeticionEliminacionDirectaParticipante = ( { 
	idCompeticionEliminacionDirectaParticipante: idNivel,
	idEquipo1, 
	idEquipo2, 
	idLinkTo, 
	fase,
	nombreCompeticion 
} ) => {
	return competicionEliminacionDirectaParticipante.addCompeticionEliminacionDirectaParticipante(conexion, idNivel, idEquipo1, idEquipo2, idLinkTo, fase, nombreCompeticion);
}

const delCompeticionEliminacionDirectaParticipante = ( { nombreCompeticion } ) => {
	return competicionEliminacionDirectaParticipante.delCompeticionEliminacionDirectaParticipante(conexion, nombreCompeticion);
}

//--------- CONTROLADOR TABLA PUNTAJE ----------

const tablaPuntaje = require('./tablaPuntajesql.js');

const allTablaPuntaje = () => {
	return tablaPuntaje.allTablaPuntaje(conexion);
}

const addTablaPuntaje = (query) => {
	return tablaPuntaje.addTablaPuntaje(conexion, query);
}

const delTablaPuntaje = (query) => {
	return tablaPuntaje.delTablaPuntaje(conexion, query)
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


//------------- EXPORTACION MODULOS -------------------
module.exports = {
	region: {
		allRegion,
		searchRegion,
		addRegion,
		delRegion,
		updateRegion
	},
	ciudad: {
		allCiudad,
		allCiudadPerRegion,
		searchCiudad,
		addCiudad,
		delCiudad,
		updateCiudad
	},
	institucion: {
		allInstitucion,
		allInstitucionPerCiudad,
		searchInstitucion,
		addInstitucion,
		delInstitucion,
		updateInstitucion
	},
	nivelEscolaridad: {
		allNivelEscolaridad
	},
	turno: {
		allTurno
	},
	sostenimiento: {
		allSostenimiento
	},
	equipo: {
		allEquipo,
		searchEquipoPerInstitucion,
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
	tipoCompeticion: {
		allTipoCompeticion,
	},
	competicion: {
		allCompeticion,
		searchCompeticion,
		addCompeticion,
		delCompeticion,
		updateCompeticion,
	},
	evento: {
		allEvento,
		getEventoPerCompeticion,
		addEvento,
		delEvento,
		updateEvento
	},
	competicionParticipantes: {
		allCompeticionParticipantes,
		addCompeticionParticipantes,
		delCompeticionParticipantes
	},
	competicionCombinadaParticipantes: {
		allCompeticionCombinadaParticipantes,
	},
	competicionEliminacionDirectaParticipante: {
		perCompeticionEliminacionDirectaParticipante,
		addCompeticionEliminacionDirectaParticipante,
		delCompeticionEliminacionDirectaParticipante
	},
	tablaPuntaje: {
		allTablaPuntaje,
		addTablaPuntaje,
		delTablaPuntaje
	},
	usuario: {
		allUsuario,
		loginUsuario,
		addUsuario,
		delUsuario
	}
}
