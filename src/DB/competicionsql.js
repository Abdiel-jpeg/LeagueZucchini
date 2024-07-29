const allCompeticion = (conexion, limit, offset) => {
	let sql = `SELECT *, (SELECT COUNT(*) FROM competicion) AS count FROM competicion LIMIT ${limit} OFFSET ${offset}`;

	if (limit == 0) {
		sql = `SELECT * FROM competicion`;
	}
	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

const searchCompeticion = (conexion, busqueda, limit, offset) => {
	const sql = `SELECT *, (SELECT COUNT(*) FROM competicion WHERE nombreCompeticion LIKE '%${busqueda}%') AS count FROM competicion WHERE nombreCompeticion LIKE '%${busqueda}%'LIMIT ${limit} OFFSET ${offset}`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const addCompeticion = (conexion, nombreCompeticion, descripcionCompeticion, nombreTipoCompeticion) => {
	const sql = `INSERT INTO competicion (nombreCompeticion, descripcionCompeticion, nombreTipoCompeticion) VALUES ("${nombreCompeticion}", "${descripcionCompeticion}", "${nombreTipoCompeticion}")`;


	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const delCompeticion = (conexion, id) => {
	const sql = `DELETE FROM competicion WHERE idCompeticion = ${id}`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const updateCompeticion = (conexion, id, nombreCompeticion, descripcionCompeticion, nombreTipoCompeticion) => {
	const sql = `UPDATE competicion SET nombreCompeticion = "${nombreCompeticion}", descripcionCompeticion = "${descripcionCompeticion}", nombreTipoCompeticion = "${nombreTipoCompeticion}" WHERE idCompeticion = ${id}`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allCompeticion,
	searchCompeticion,
	addCompeticion,
	delCompeticion,
	updateCompeticion
}
