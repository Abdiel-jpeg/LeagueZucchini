const allCiudad = (conexion) => {
	const sql = `SELECT c.idCiudad, c.nombreCiudad, c.idRegion, r.nombreRegion FROM ciudad c LEFT JOIN region r ON c.idRegion = r.idRegion;`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

const individualCiudad = (conexion, id) => {
	const sql = `SELECT c.idCiudad, c.nombreCiudad, c.idRegion, r.nombreRegion FROM ciudad c LEFT JOIN region r ON c.idRegion = r.idRegion WHERE c.idCiudad = ${id};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const addCiudad = (conexion, nombreCiudad, idRegion) => {
	const sql = `INSERT INTO ciudad (nombreCiudad, idRegion) VALUES ("${nombreCiudad}", ${idRegion});`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const delCiudad = (conexion, id) => {
	const sql = `DELETE FROM ciudad WHERE idCiudad=${id};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const updateCiudad = (conexion, id, nombreCiudad, idRegion) => {
	const sql = `UPDATE ciudad SET nombreCiudad = "${nombreCiudad}", idRegion=${idRegion} WHERE idCiudad = ${id}`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allCiudad,
	individualCiudad,
	addCiudad,
	delCiudad,
	updateCiudad
}
