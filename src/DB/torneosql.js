const allTorneo = (conexion) => {
	const sql = `SELECT * FROM torneo`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

module.exports = {
	allTorneo
}
