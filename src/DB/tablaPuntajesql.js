const allTablaPuntaje = (conexion) => {
	const sql = `SELECT tp.idTablaPuntaje, tp.posicion, tp.equipoPuntaje, e.grado, e.grupo, e.nombreGrupo, tp.puntos, tp.partidosGanados, tp.partidosPerdidos, tp.partidosEmpatados, tp.golesAFavor, tp.golesEnContra, tp.diferenciaGoles, tp.idTorneo, t.nombreTorneo FROM tablaPuntaje tp LEFT JOIN equipo e ON tp.equipoPuntaje = e.idEquipo LEFT JOIN torneo t ON tp.idTorneo = t.idTorneo;`

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

module.exports = {
	allTablaPuntaje,
}
