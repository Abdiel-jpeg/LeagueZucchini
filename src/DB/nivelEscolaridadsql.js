
const allNivelEscolaridad = (conexion) => {
	const sql = `SELECT * FROM nivelEscolaridad`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allNivelEscolaridad
}
