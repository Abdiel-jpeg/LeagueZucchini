const allCompeticionParticipantes = (conexion) => {
	const sql =  `SELECT cp.idCompeticion,c.nombreCompeticion,cp.idEquipo,e.grado,e.grupo,e.nombreGrupo FROM competicionParticipantes cp LEFT JOIN competicion c ON cp.idCompeticion = c.idCompeticion LEFT JOIN equipo e ON cp.idEquipo = e.idEquipo;`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		}); 
	});
}

module.exports = {
	allCompeticionParticipantes,
}
