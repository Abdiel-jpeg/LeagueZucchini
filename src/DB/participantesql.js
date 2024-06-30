const allParticipante = (conexion) => {
	const sql = `SELECT p.idParticipante, p.nombreParticipante, p.fechaNacimientoParticipante, p.direccionParticipante, p.direccionParticipante, p.nss, p.autorizacionAdulto, p.enfermedadesParticipante, p.medicamentosParticipante, p.operacionesParticipante, p.idEquipo, e.grado, e.grupo, e.nombreGrupo FROM participante p LEFT JOIN equipo e ON p.idEquipo = e.idEquipo;`

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

module.exports = {
	allParticipante,
}
