
const allCiudad = (conexion, limit, offset) => {
	const sql = `SELECT *, (SELECT COUNT(*) FROM ciudad) AS count FROM ciudad LIMIT ${limit} OFFSET ${offset};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

const allCiudadPerRegion = (conexion, nombreRegion) => {
	const sql = `SELECT * FROM ciudad WHERE nombreRegion = "${nombreRegion}"`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const searchCiudad = (conexion, busqueda, limit, offset) => {
	const sql = `SELECT *, (SELECT COUNT(*) FROM ciudad WHERE nombreCiudad LIKE '%${busqueda}%') AS count FROM ciudad WHERE nombreCiudad LIKE '%${busqueda}%' LIMIT ${limit} OFFSET ${offset};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			error ? reject(error) : resolve(result);
		})
	})
}

const addCiudad = (conexion, nombreCiudad, nombreRegion) => {
	const sql = `INSERT INTO ciudad VALUES ("${nombreCiudad}", "${nombreRegion}")`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const delCiudad = (conexion, nombreCiudad, nombreRegion) => {
	const sql = `DELETE FROM ciudad WHERE nombreCiudad="${nombreCiudad}" AND nombreRegion = "${nombreRegion}"`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const updateCiudad = (conexion, nuevoNombreCiudad, nuevoNombreRegion, nombreCiudad, nombreRegion) => {
	const sql = `UPDATE ciudad SET nombreCiudad = "${nuevoNombreCiudad}", nombreRegion="${nuevoNombreRegion}" WHERE nombreCiudad = "${nombreCiudad}" AND nombreRegion='${nombreRegion}'`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allCiudad,
	allCiudadPerRegion,
	searchCiudad,
	addCiudad,
	delCiudad,
	updateCiudad
}
