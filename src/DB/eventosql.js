const allEvento = (conexion) => {
	const sql = ` SELECT e.idEvento,e.nombreEvento,e.faseActual,e.fechaInicio,e.idEquipo1,f.grado,f.grupo,f.nombreGrupo,e.golesEquipo1,e.tarjetasAmarillasEquipo1,e.tarjetasRojasEquipo1,e.golesPenalesFinalesEquipo1,e.idEquipo2,g.grado,g.grupo,g.nombreGrupo,e.golesEquipo2,e.tarjetasAmarillasEquipo2,e.tarjetasRojasEquipo2,e.golesPenalesFinalesEquipo2,e.cantidadTiempoExtra,e.ganadorPartido,e.esPartidoEmpatado,e.puntosEquipo1,e.puntosEquipo2,e.idCompeticion,c.nombreCompeticion FROM evento e LEFT JOIN equipo f ON e.idEquipo1 = f.idEquipo LEFT JOIN equipo g ON e.idEquipo2 = g.idEquipo LEFT JOIN competicion c ON e.idCompeticion = c.idCompeticion;`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allEvento,
}
