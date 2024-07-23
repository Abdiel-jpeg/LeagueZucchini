const allRegion = (conexion, limit, offset) => {
	let sql = `SELECT *, (SELECT COUNT(*) FROM region) AS count FROM region LIMIT ${limit} OFFSET ${offset};`;

	if (limit == 0) {
		sql = `SELECT * FROM region`;
	}

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

const searchRegion = (conexion, busqueda, limit, offset) => {
	const sql = `SELECT *, (SELECT COUNT(*) FROM region WHERE nombreRegion LIKE '%${busqueda}%') AS count FROM region WHERE nombreRegion LIKE '%${busqueda}%' LIMIT ${limit} OFFSET ${offset};`

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const addRegion = (conexion, nombreRegion) => {
	const sql = `INSERT INTO region VALUES ("${nombreRegion}");`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const delRegion = (conexion, nombreRegion) => {
	const sql = `DELETE FROM region WHERE nombreRegion="${nombreRegion}";`;

	console.log(sql);

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const updateRegion  = (conexion, nuevoNombreRegion, nombreRegion) => {
	const sql = `UPDATE region SET nombreRegion = "${nuevoNombreRegion}" WHERE nombreRegion = "${nombreRegion}";`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allRegion,
	searchRegion,
	addRegion,
	delRegion,
	updateRegion
}
