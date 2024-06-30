const allRegion = (conexion) => {
	const sql = `SELECT * FROM region`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

module.exports = {
	allRegion,
}
