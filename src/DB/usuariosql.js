const allUsuario = (conexion) => {
	const sql = "SELECT * FROM usuario;";

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

const loginUsuario = (conexion, nombreUsuario, contrasenia) => {
	const sql = `SELECT * FROM usuario WHERE nombreUsuario="${nombreUsuario}" AND contraseniaUsuario="${contrasenia}"`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			
			//Si la consulta SELECT no encontró ninguna coincidencia, entonces
			//devolvera una lista vacía. En consola debe de verse la longitud
			//Si es 1, el usuario junto con su contraseña ha sido encontrado
			//Si es 0 no existe
			console.log(result.length);

			if (result.length == 0) { 
				reject("Nombre de usaurio o contraseña incorrectos");
			}

			return error ? reject(error) : resolve(result);
		});
	});
}

const addUsuario = (conexion, nombreUsuario, contrasenia, correo, nTelefono, fotoPerfil) => {
	const sql = `INSERT INTO usuario (nombreUsuario, contraseniaUsuario, correoUsuario, nTelefonoUsuario) VALUES ("${nombreUsuario}", "${contrasenia}", "${correo}", ${nTelefono})`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const delUsuario = (conexion, idUsuario) => {
	const sql = `DELETE FROM usuario WHERE idUsuario = ${idUsuario}`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allUsuario,
	loginUsuario,
	addUsuario,
	delUsuario
}
