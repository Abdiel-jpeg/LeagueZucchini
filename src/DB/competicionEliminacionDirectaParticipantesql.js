
const addCompeticionEliminacionDirectaParticipante = (conexion, idNivel, idEquipo1, idEquipo2, idLinkTo, nombreCompeticion) => {
	const sql = `INSERT INTO competicionEliminacionDirectaParticipante (idCompeticionEliminacionDirectaParticipante, idEquipo1, idEquipo2, idLinkTo, idCompeticion) VALUES (${idNivel}, ${idEquipo1}, ${idEquipo2}, ${idLinkTo}, (SELECT idCompeticion FROM competicion WHERE nombreCompeticion='${nombreCompeticion}' LIMIT 1));`


	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
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
