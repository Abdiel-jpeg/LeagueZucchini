const allTablaPuntaje = (conexion) => {
	const sql = `SELECT tp.idTablaPuntaje, tp.posicion, tp.idEquipoTablaPuntaje, e.grado, e.grupo, e.nombreGrupo, tp.puntos, tp.partidosGanados, tp.partidosPerdidos, tp.partidosEmpatados, tp.golesAFavor, tp.golesEnContra, tp.diferenciaGoles, tp.idCompeticion, c.nombreCompeticion FROM tablaPuntaje tp LEFT JOIN equipo e ON tp.idEquipoTablaPuntaje = e.idEquipo LEFT JOIN competicion c ON tp.idCompeticion = c.idCompeticion;`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

module.exports = {
	allTablaPuntaje,
}
