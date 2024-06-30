const allTelefonosParticipante = (conexion) => {
	const sql = `SELECT tp.nTelefonoParticipante, tp.idParticipante, p.nombreParticipante FROM telefonosParticipante tp LEFT JOIN participante p ON tp.idParticipante = p.idParticipante;`

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allTelefonosParticipante,
}
