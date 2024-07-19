const allTelefonosParticipante = (conexion) => {
	const sql = `SELECT tp.nTelefonoParticipante, tp.idParticipante, p.nombreParticipante FROM telefonosParticipante tp LEFT JOIN participante p ON tp.idParticipante = p.idParticipante;`

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const getTelefonosParticipante = (conexion, idParticipante) => {
	const sql = `SELECT tp.nTelefonoParticipante, tp.idParticipante, p.nombreParticipante FROM telefonosParticipante tp LEFT JOIN participante p ON tp.idParticipante = p.idParticipante WHERE tp.idParticipante = ${idParticipante};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			error ? reject(error) : resolve(result);
		})
	})
}

const addTelefonosParticipante = (conexion, telefono, idParticipante) => {
	const sql = `INSERT INTO telefonosParticipante VALUES (${telefono}, ${idParticipante});`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			error ? reject(error) : resolve(result);
		})
	})
}

const delTelefonosParticipante = (conexion, telefono, idParticipante) => {
	const sql = `DELETE FROM telefonosParticipante WHERE nTelefonoParticipante = ${telefono} AND idParticipante = ${idParticipante};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const updateTelefonosParticipante = (
	conexion,
	telefono,
	idParticipante,
	newTelefono,
	newIdParticipante
) => {
	const sql = `UPDATE telefonosParticipante SET nTelefonoParticipante = ${newTelefono}, idParticipante = ${newIdParticipante} WHERE nTelefonoParticipante = ${telefono} AND idParticipante = ${idParticipante};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allTelefonosParticipante,
	getTelefonosParticipante,
	addTelefonosParticipante,
	delTelefonosParticipante,
	updateTelefonosParticipante,
}
