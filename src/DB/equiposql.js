const allEquipo = (conexion) => {
	const sql = `SELECT e.idEquipo, e.grado, e.grupo, e.nombreGrupo, e.idInstitucion, i.nombreInstitucion FROM equipo e LEFT JOIN institucion i ON e.idInstitucion = i.idInstitucion;`

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

const individualEquipo = (conexion, id) => {	
	const sql = `SELECT e.idEquipo, e.grado, e.grupo, e.nombreGrupo, e.idInstitucion, i.nombreInstitucion FROM equipo e LEFT JOIN institucion i ON e.idInstitucion = i.idInstitucion 	WHERE e.idEquipo = ${id};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const addEquipo = (conexion, grado, grupo, nombreGrupo, idInstitucion) => {
	const sql = `INSERT INTO equipo (grado, grupo, nombreGrupo, idInstitucion) VALUES (${grado}, "${grupo}", "${nombreGrupo}", ${idInstitucion})`;

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

const updateEquipo = (conexion, id, grado, grupo, nombreGrupo, idInstitucion) => {
	const sql = `UPDATE equipo SET grado = ${grado}, grupo = "${grupo}", nombreGrupo="${nombreGrupo}", idInstitucion=${idInstitucion} WHERE idEquipo = ${id};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allEquipo,
	individualEquipo,
	addEquipo,
	delEquipo,
	updateEquipo
}
