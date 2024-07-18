const allRegion = (conexion) => {
	const sql = `SELECT * FROM region;`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

const individualRegion = (conexion, id) => {
	const sql = `SELECT * FROM region WHERE idRegion=${id};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const addRegion = (conexion, nombreRegion) => {
	const sql = `INSERT INTO region (nombreRegion) VALUES ("${nombreRegion}");`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const delRegion = (conexion, id) => {
	const sql = `DELETE FROM region WHERE idRegion=${id};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const updateRegion  = (conexion, id, nombreRegion) => {
	const sql = `UPDATE region SET nombreRegion = "${nombreRegion}" WHERE idRegion = ${id};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allRegion,
	individualRegion,
	addRegion,
	delRegion,
	updateRegion
}
