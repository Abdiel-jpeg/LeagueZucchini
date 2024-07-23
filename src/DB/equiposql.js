const allEquipo = (conexion, limit, offset) => {
	const sql = `SELECT e.idEquipo, e.grado, e.grupo, e.nombreGrupo, e.nombreInstitucion, i.nombreCiudad, c.nombreRegion, (SELECT COUNT(*) FROM equipo) AS count FROM equipo e LEFT JOIN institucion i ON e.nombreInstitucion = i.nombreInstitucion LEFT JOIN ciudad c ON i.nombreCiudad = c.nombreCiudad LIMIT ${limit} OFFSET ${offset};`

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

const searchEquipoPerInstitucion = (conexion, nombreInstitucion, limit, offset) => {	
	const sql = `SELECT e.idEquipo, e.grado, e.grupo, e.nombreGrupo, e.nombreInstitucion, i.nombreCiudad, c.nombreRegion, (SELECT COUNT(*) FROM equipo WHERE nombreInstitucion LIKE '%${nombreInstitucion}%') AS count FROM equipo e LEFT JOIN institucion i ON e.nombreInstitucion = i.nombreInstitucion LEFT JOIN ciudad c ON i.nombreCiudad = c.nombreCiudad WHERE e.nombreInstitucion LIKE '%${nombreInstitucion}%' LIMIT ${limit} OFFSET ${offset};`

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const addEquipo = (conexion, grado, grupo, nombreGrupo, nombreInstitucion) => {
	const sql = `INSERT INTO equipo (grado, grupo, nombreGrupo, nombreInstitucion) VALUES (${grado}, "${grupo}", "${nombreGrupo}", "${nombreInstitucion}")`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
} 

const delEquipo = (conexion, id) => {
	const sql = `DELETE FROM equipo WHERE idEquipo = ${id}`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const updateEquipo = (conexion, id, grado, grupo, nombreGrupo, nombreInstitucion) => {
	const sql = `UPDATE equipo SET grado = ${grado}, grupo = "${grupo}", nombreGrupo="${nombreGrupo}", nombreInstitucion="${nombreInstitucion}" WHERE idEquipo = ${id};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allEquipo,
	searchEquipoPerInstitucion,
	addEquipo,
	delEquipo,
	updateEquipo
}
