const allEvento = (conexion) => {
	const sql = `SELECT e.idEvento, e.nombreEvento, e.equipo1, f.nombreGrupo AS nombreEquipo1, e.equipo2, g.nombreGrupo AS nombreEquipo2, e.categoria, e.fechaInicio, e.ganadorPartido, e.partidoEmpatado, e.golesEquipo1, e.golesEquipo2, e.puntosEquipo1, e.puntosEquipo2, e.idTorneo, t.nombreTorneo FROM evento e LEFT JOIN equipo f ON e.equipo1 = f.idEquipo LEFT JOIN equipo g ON e.equipo2 = g.idEquipo LEFT JOIN torneo t ON e.idTorneo = t.idTorneo;
`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allEvento,
}
