const allInstitucion = (conexion) => {
	const sql = `SELECT i.idInstitucion, i.nombreInstitucion, i.direccionInstitucion, i.nInstitucionPais, i.cct, i.idNivelEscolaridad, ne.nombreNivelEscolaridad, i.idTurno, t.nombreTurno, i.idSostenimiento, s.nombreSostenimiento, i.paginaWebInstitucion, i.idCiudad, c.nombreCiudad FROM institucion i LEFT JOIN nivelEscolaridad ne ON i.idNivelEscolaridad = ne.idNivelEscolaridad LEFT JOIN turno t ON i.idTurno = t.idTurno LEFT JOIN sostenimiento s ON i.idSostenimiento = s.idSostenimiento LEFT JOIN ciudad c ON i.idCiudad = c.idCiudad;`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const individualInstitucion = (conexion, id) => {
	const sql = `SELECT i.idInstitucion, i.nombreInstitucion, i.direccionInstitucion, i.nInstitucionPais, i.cct, i.idNivelEscolaridad, ne.nombreNivelEscolaridad, i.idTurno, t.nombreTurno, i.idSostenimiento, s.nombreSostenimiento, i.paginaWebInstitucion, i.idCiudad, c.nombreCiudad FROM institucion i LEFT JOIN nivelEscolaridad ne ON i.idNivelEscolaridad = ne.idNivelEscolaridad LEFT JOIN turno t ON i.idTurno = t.idTurno LEFT JOIN sostenimiento s ON i.idSostenimiento = s.idSostenimiento LEFT JOIN ciudad c ON i.idCiudad = c.idCiudad WHERE i.idInstitucion = ${id};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const addInstitucion = (
	conexion, 
	nombreInstitucion, 
	direccionInstitucion, 
	nInstitucionPais, 
	cct, 
	idNivelEscolaridad, 
	idTurno, 
	idSostenimiento, 
	paginaWebInstitucion, 
	idCiudad
) => {
	const sql = `INSERT INTO institucion (nombreInstitucion, direccionInstitucion, nInstitucionPais, cct, idNivelEscolaridad, idTurno, idSostenimiento, paginaWebInstitucion, idCiudad) VALUES ("${nombreInstitucion}", "${direccionInstitucion}", ${nInstitucionPais}, ${cct}, ${idNivelEscolaridad}, ${idTurno}, ${idSostenimiento}, "${paginaWebInstitucion}", ${idCiudad})`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const delInstitucion = (conexion, id) => {
	const sql = `DELETE FROM institucion WHERE idInstitucion = ${id}`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			error ? reject(error) : resolve(result);
		})
	})
}

const updateInstitucion = (
	conexion,
	id,
	nombreInstitucion,
	direccionInstitucion,
	nInstitucionPais,
	cct,
	idNivelEscolaridad,
	idTurno,
	idSostenimiento,
	paginaWebInstitucion,
	idCiudad
) => {
	const sql = `UPDATE institucion SET nombreInstitucion = "${nombreInstitucion}", direccionInstitucion = "${direccionInstitucion}", nInstitucionPais = ${nInstitucionPais}, cct = ${cct}, idNivelEscolaridad = ${idNivelEscolaridad}, idTurno = ${idTurno}, idSostenimiento = ${idSostenimiento}, paginaWebInstitucion = "${paginaWebInstitucion}", idCiudad = ${idCiudad} WHERE idInstitucion = ${id}`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allInstitucion,
	individualInstitucion,
	addInstitucion,
	delInstitucion,
	updateInstitucion
}
