const allTipoCompeticion = (conexion) => {
	const sql = `SELECT * FROM tipoCompeticion;`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

module.exports = {
	allTipoCompeticion
}
