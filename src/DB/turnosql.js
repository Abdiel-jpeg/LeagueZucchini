
const allTurno = (conexion) => {
	const sql = `SELECT * FROM turno;`

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allTurno
}
