const allCompeticion = (conexion) => {
	const sql = `SELECT c.idCompeticion,c.nombreCompeticion,c.descripcionCompeticion,c.idTipoCompeticion,t.nombreTipoCompeticion FROM competicion c LEFT JOIN tipoCompeticion t ON c.idTipoCompeticion = t.idTipoCompeticion;`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

module.exports = {
	allCompeticion
}
