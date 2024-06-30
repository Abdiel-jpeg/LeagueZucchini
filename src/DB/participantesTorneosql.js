const allParticipantesTorneo = (conexion) => {
	const sql =  `SELECT pt.idTorneo, t.nombreTorneo, pt.idEquipo, e.grado, e.grupo, e.nombreGrupo FROM participantesTorneo pt LEFT JOIN torneo t ON pt.idTorneo = t.idTorneo LEFT JOIN equipo e ON pt.idEquipo = e.idEquipo`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		}); 
	});
}

module.exports = {
	allParticipantesTorneo,
}
