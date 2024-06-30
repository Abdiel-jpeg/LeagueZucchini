const allEquipo = (conexion) => {
	const sql = `SELECT e.idEquipo, e.grado, e.grupo, e.nombreGrupo, e.idInstitucion, i.nombreInstitucion FROM equipo e LEFT JOIN institucion i ON e.idInstitucion = i.idInstitucion;`

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

module.exports = {
	allEquipo,
}
