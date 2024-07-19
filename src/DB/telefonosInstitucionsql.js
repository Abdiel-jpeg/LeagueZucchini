const allTelefonosInstitucion = (conexion) =>{
	const sql = "SELECT t.nTelefonoInstitucion, t.idInstitucion, i.nombreInstitucion FROM telefonosInstitucion t LEFT JOIN institucion i ON t.idInstitucion = i.idInstitucion;";
	
	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const getTelefonosInstitucion = (conexion, idInstitucion) => {
	const sql = `SELECT ti.nTelefonoInstitucion, ti.idInstitucion, i.nombreInstitucion FROM telefonosInstitucion ti LEFT JOIN institucion i ON ti.idInstitucion = i.idInstitucion WHERE ti.idInstitucion = ${idInstitucion};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			error ? reject(error) : resolve(result);
		})
	})
}



const addTelefonosInstitucion = (conexion, telefono, idInstitucion) => {
	const sql = `INSERT INTO telefonosInstitucion VALUES (${telefono}, ${idInstitucion});`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			error ? reject(error) : resolve(result);
		})
	})
}

const delTelefonosInstitucion = (conexion, telefono, idInstitucion) => {
	const sql = `DELETE FROM telefonosInstitucion WHERE nTelefonoInstitucion=${telefono} AND idInstitucion = ${idInstitucion};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			error ? reject(error) : resolve(result);
		})
	})
}

const updateTelefonosInstitucion = (
	conexion, 
	telefono, 
	idInstitucion, 
	newTelefono,
	newIdInstitucion
) => {
	const sql = `UPDATE telefonosInstitucion SET nTelefonoInstitucion = ${newTelefono}, idInstitucion = ${newIdInstitucion} WHERE nTelefonoInstitucion = ${telefono} AND idInstitucion = ${idInstitucion};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allTelefonosInstitucion,
	getTelefonosInstitucion,
	addTelefonosInstitucion,
	delTelefonosInstitucion,
	updateTelefonosInstitucion
}
