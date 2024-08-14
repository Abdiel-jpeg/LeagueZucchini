

const perCompeticionEliminacionDirectaParticipante = (conexion, params) => {
	const sql= `SELECT 
		c.idCompeticionEliminacionDirectaParticipante, 
		c.idEquipo1, 
		e.grado AS gradoEquipo1, 
		e.grupo AS grupoEquipo1, 
		e.nombreGrupo AS nombreGrupoEquipo1, 
		e.nombreInstitucion AS nombreInstitucionEquipo1, 
		c.idEquipo2, 
		f.grado AS gradoEquipo2, 
		f.grupo AS grupoEquipo2, 
		f.nombreGrupo AS nombreGrupoEquipo2, 
		f.nombreInstitucion AS nombreInstitucionEquipo2, 
		c.idLinkTo,
		c.fase
	FROM competicionEliminacionDirectaParticipante c 
	LEFT JOIN equipo e ON c.idEquipo1=e.idEquipo 
	LEFT JOIN equipo f ON c.idEquipo2 = f.idEquipo 
	WHERE idCompeticion=(
		SELECT idCompeticion FROM competicion WHERE nombreCompeticion=?
	);`

	let values = [
		params.nombreCompeticion
	]

	return new Promise((resolve, reject) => {
		conexion.query(sql, values, (error, result) => {
			return error ? reject(error) : resolve(result)
		})
	})
}

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
	perCompeticionEliminacionDirectaParticipante,
	addCompeticionEliminacionDirectaParticipante,
	delCompeticionEliminacionDirectaParticipante
}
