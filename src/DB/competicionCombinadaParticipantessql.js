const allCompeticionCombinadaParticipantes = (conexion) => {
	const sql = `SELECT ccp.idCompeticion, c.nombreCompeticion, ccp.idEquipo, e.grado, e.grupo, e.nombreGrupo, ccp.grupoCompeticionCombinada FROM competicionCombinadaParticipantes ccp LEFT JOIN competicion c ON ccp.idCompeticion  = c.idCompeticion LEFT JOIN equipo e ON ccp.idEquipo = e.idEquipo;`

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

module.exports = {
	allCompeticionCombinadaParticipantes
}
