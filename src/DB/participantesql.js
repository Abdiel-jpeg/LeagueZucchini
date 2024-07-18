const allParticipante = (conexion) => {
	const sql = `SELECT p.idParticipante, p.nombreParticipante, p.fechaNacimientoParticipante, p.direccionParticipante, p.direccionParticipante, p.nss, p.autorizacionAdulto, p.enfermedadesParticipante, p.medicamentosParticipante, p.operacionesParticipante, p.idEquipo, e.grado, e.grupo, e.nombreGrupo FROM participante p LEFT JOIN equipo e ON p.idEquipo = e.idEquipo;`

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

const individualParticipante = (conexion, id) => {
	const sql = `SELECT p.idParticipante, p.nombreParticipante, p.fechaNacimientoParticipante, p.direccionParticipante, p.direccionParticipante, p.nss, p.autorizacionAdulto, p.enfermedadesParticipante, p.medicamentosParticipante, p.operacionesParticipante, p.idEquipo, e.grado, e.grupo, e.nombreGrupo FROM participante p LEFT JOIN equipo e ON p.idEquipo = e.idEquipo WHERE p.idParticipante = ${id};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const addParticipante = (
	conexion,
	nombreParticipante,
	fechaNacimientoParticipante,
	direccionParticipante,
	nss,
	autorizacionAdulto,
	enfermedadesParticipante,
	medicamentosParticipante,
	operacionesParticipante,
	idEquipo
) => {
	const sql = `INSERT INTO participante (nombreParticipante, fechaNacimientoParticipante, direccionParticipante, nss, autorizacionAdulto, enfermedadesParticipante, medicamentosParticipante, operacionesParticipante, idEquipo) VALUES ("${nombreParticipante}", "${fechaNacimientoParticipante}", "${direccionParticipante}", ${nss}, ${autorizacionAdulto}, "${enfermedadesParticipante}", "${medicamentosParticipante}", "${operacionesParticipante}", ${idEquipo});`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result)
		})
	})
}

const delParticipante = (conexion, id) => {
	const sql = `DELETE FROM participante WHERE idParticipante = ${id}`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const updateParticipante = (
	conexion,
	id,
	nombreParticipante,
	fechaNacimientoParticipante,
	direccionParticipante,
	nss,
	autorizacionAdulto,
	enfermedadesParticipante,
	medicamentosParticipante,
	operacionesParticipante,
	idEquipo
) => {
	const sql = `UPDATE participante SET nombreParticipante = "${nombreParticipante}", fechaNacimientoParticipante = "${fechaNacimientoParticipante}", direccionParticipante = "${direccionParticipante}", nss = ${nss}, autorizacionAdulto = ${autorizacionAdulto}, enfermedadesParticipante = "${enfermedadesParticipante}", medicamentosParticipante = "${medicamentosParticipante}", operacionesParticipante = "${operacionesParticipante}", idEquipo = ${idEquipo} WHERE idParticipante = ${id};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allParticipante,
	individualParticipante,
	addParticipante,
	delParticipante,
	updateParticipante
}
