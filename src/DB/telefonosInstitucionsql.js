const allTelefonosInstitucion = (conexion) =>{
	const sql = "SELECT t.nTelefonoInstitucion, t.idInstitucion, i.nombreInstitucion FROM telefonosInstitucion t LEFT JOIN institucion i ON t.idInstitucion = i.idInstitucion;";
	
	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allTelefonosInstitucion,
}
