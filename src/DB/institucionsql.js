const allInstitucion = (conexion, limit, offset) => {
	const sql = `SELECT *, (SELECT COUNT(*) FROM institucion) AS count  FROM institucion LEFT JOIN ciudad c ON institucion.nombreCiudad = c.nombreCiudad LIMIT ${limit} OFFSET ${offset};` 

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const allInstitucionPerCiudad = (conexion, nombreCiudad) => {
	const sql = `SELECT * FROM institucion WHERE nombreCiudad = "${nombreCiudad}"`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ?  reject(error) : resolve(result);
		})
	})
}

const searchInstitucion = (conexion, busqueda, limit, offset) => {
	const sql = `SELECT *, (SELECT COUNT(*) FROM institucion WHERE nombreInstitucion LIKE '%${busqueda}%') AS count FROM institucion LEFT JOIN ciudad c ON institucion.nombreCiudad = c.nombreCiudad WHERE nombreInstitucion LIKE '%${busqueda}%' LIMIT ${limit} OFFSET ${offset};`;

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
	nombreNivelEscolaridad, 
	nombreTurno, 
	nombreSostenimiento, 
	paginaWebInstitucion, 
	institucionTelefono1,
	institucionTelefono2,
	nombreCiudad
) => {
	const sql = `INSERT INTO institucion VALUES ("${nombreInstitucion}", "${direccionInstitucion}", ${nInstitucionPais}, ${cct}, "${nombreNivelEscolaridad}", "${nombreTurno}", "${nombreSostenimiento}", "${paginaWebInstitucion}", "${institucionTelefono1}", "${institucionTelefono2}", "${nombreCiudad}")`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const delInstitucion = (conexion, nombreInstitucion) => {
	const sql = `DELETE FROM institucion WHERE nombreInstitucion = "${nombreInstitucion}";`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			error ? reject(error) : resolve(result);
		})
	})
}

const updateInstitucion = (
	conexion,
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
) => {
	const sql = `UPDATE institucion SET nombreInstitucion = "${nombreInstitucion}", direccionInstitucion = "${direccionInstitucion}", nInstitucionPais = ${nInstitucionPais}, cct = ${cct}, nombreNivelEscolaridad = "${nombreNivelEscolaridad}", nombreTurno = "${nombreTurno}", nombreSostenimiento = "${nombreSostenimiento}", paginaWebInstitucion = "${paginaWebInstitucion}", institucionTelefono1 = "${institucionTelefono1}", institucionTelefono2="${institucionTelefono2}", nombreCiudad = "${nombreCiudad}" WHERE nombreInstitucion = "${antiguoNombreInstitucion}"`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allInstitucion,
	allInstitucionPerCiudad,
	searchInstitucion,
	addInstitucion,
	delInstitucion,
	updateInstitucion
}
