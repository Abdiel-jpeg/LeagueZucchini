const allInstitucion = (conexion) => {
	const sql = `SELECT i.idInstitucion, i.nombreInstitucion, i.direccionInstitucion, i.nInstitucionPais, i.cct, i.nivelEscolar, i.turno, i.sostenimiento, i.paginaWebInstitucion, i.idCiudad, c.nombreCiudad FROM institucion i LEFT JOIN ciudad c ON i.idCiudad = c.idCiudad;`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allInstitucion,
}
