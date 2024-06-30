const allCiudad = (conexion) => {
	const sql = `SELECT c.idCiudad, c.nombreCiudad, c.idRegion, r.nombreRegion FROM ciudad c LEFT JOIN region r ON c.idRegion = r.idRegion;`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

module.exports = {
	allCiudad,
}
