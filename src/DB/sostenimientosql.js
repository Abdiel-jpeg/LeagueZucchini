
const allSostenimiento = (conexion) => {
	const sql = 'SELECT * FROM sostenimiento';

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allSostenimiento
}
