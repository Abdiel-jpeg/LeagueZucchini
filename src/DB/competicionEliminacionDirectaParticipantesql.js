
const addCompeticionEliminacionDirectaParticipante = (conexion, idNivel, idEquipo1, idEquipo2, idLinkTo, fase, nombreCompeticion) => {
	const sql = `INSERT INTO competicionEliminacionDirectaParticipante (
		idCompeticionEliminacionDirectaParticipante, 
		idEquipo1, 
		idEquipo2, 
		idLinkTo,
		fase,
		idCompeticion
		) VALUES (?, ?, ?, ?, ?, (SELECT idCompeticion FROM competicion WHERE nombreCompeticion=? LIMIT 1));`

	let values = [
		idNivel,
		idEquipo1 == 'null' ? null : idEquipo1,
		idEquipo2 == 'null' ? null : idEquipo2,
		idLinkTo == 'null' ? null : idLinkTo,
		fase, 
		nombreCompeticion
	]

	return new Promise((resolve, reject) => {
		conexion.query(sql, values, (error, result) => {
			return error ? reject(error) : resolve(result)
		})
	})
}

const delCompeticionEliminacionDirectaParticipante = (conexion, nombreCompeticion) => {
	const sql = `DELETE FROM competicionEliminacionDirectaParticipante WHERE idCompeticion = (SELECT idCompeticion FROM competicion WHERE nombreCompeticion='${nombreCompeticion}' LIMIT 1);`

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result)
		})
	})
}

module.exports = {
	addCompeticionEliminacionDirectaParticipante,
	delCompeticionEliminacionDirectaParticipante
}
