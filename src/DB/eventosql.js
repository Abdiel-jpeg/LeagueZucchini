const allEvento = (conexion) => {
	const sql = ` SELECT 
		e.idEvento,
		e.nombreEvento,
		e.faseActual,
		e.fechaInicio,
		e.idEquipo1,
		f.grado,
		f.grupo,
		f.nombreGrupo,
		e.golesEquipo1,
		e.tarjetasAmarillasEquipo1,
		e.tarjetasRojasEquipo1,
		e.golesPenalesFinalesEquipo1,
		e.idEquipo2,
		g.grado,
		g.grupo,
		g.nombreGrupo,
		e.golesEquipo2,
		e.tarjetasAmarillasEquipo2,
		e.tarjetasRojasEquipo2,
		e.golesPenalesFinalesEquipo2,
		e.cantidadTiempoExtra,
		e.ganadorPartido,
		e.esPartidoEmpatado,
		e.puntosEquipo1,
		e.puntosEquipo2,
		e.idCompeticion,
		c.nombreCompeticion 
		FROM evento e 
		LEFT JOIN equipo f ON e.idEquipo1 = f.idEquipo 
		LEFT JOIN equipo g ON e.idEquipo2 = g.idEquipo 
		LEFT JOIN competicion c ON e.idCompeticion = c.idCompeticion;`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const getEventoPerCompeticion = (conexion, nombreCompeticion, limit, offset) => {
	const sql = `SELECT 
		e.idEvento, 
		e.nombreEvento, 
		e.faseActual, 
		e.fechaInicio, 
		e.idEquipo1,
		f.grado AS gradoEquipo1, 
		f.grupo AS grupoEquipo1, 
		f.nombreGrupo AS nombreGrupoEquipo1, 
		f.nombreInstitucion AS nombreInstitucionEquipo1,
		e.golesEquipo1,  
		e.tarjetasAmarillasEquipo1, 
		e.tarjetasRojasEquipo1, 
		e.golesPenalesFinalesEquipo1, 
		e.idEquipo2, 
		g.grado AS gradoEquipo2,
		g.grupo AS grupoEquipo2, 
		g.nombreGrupo AS nombreGrupoEquipo2,
		g.nombreInstitucion AS nombreInstitucionEquipo2,
		e.golesEquipo2, 
		e.tarjetasAmarillasEquipo2, 
		e.tarjetasRojasEquipo2, 
		e.golesPenalesFinalesEquipo2, 
		e.cantidadTiempoExtra, 
		e.ganadorPartido, 
		e.esPartidoEmpatado, 
		e.puntosEquipo1, 
		e.puntosEquipo2, 
		e.idCompeticion, 
		c.nombreCompeticion, 
		c.nombreTipoCompeticion 
		FROM evento e 
		LEFT JOIN equipo f ON e.idEquipo1 = f.idEquipo 
		LEFT JOIN equipo g ON e.idEquipo2 = g.idEquipo 
		LEFT JOIN competicion c ON e.idCompeticion = c.idCompeticion 
		WHERE e.idCompeticion = (SELECT idCompeticion FROM competicion WHERE nombreCompeticion='${nombreCompeticion}' LIMIT 1)
		LIMIT ${limit}
		OFFSET ${offset};`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const addEvento = (conexion, nombreEvento, idEquipo1, idEquipo2, nombreCompeticion) => {
	const sql = `INSERT INTO evento (nombreEvento, idEquipo1, idEquipo2, idCompeticion) VALUES ('${nombreEvento}', ${idEquipo1}, ${idEquipo2}, (SELECT idCompeticion FROM competicion WHERE nombreCompeticion='${nombreCompeticion}' LIMIT 1))`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const delEvento = (conexion, nombreCompeticion) => {
	const sql = `DELETE FROM evento WHERE idCompeticion = (SELECT idCompeticion FROM competicion WHERE nombreCompeticion = '${nombreCompeticion}' LIMIT 1);`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const updateEvento = (conexion, query) => {
	let sql;
	let values;

	console.log(query)

	switch(query.parte) {
		case "evento":
			sql = `UPDATE evento SET 
				nombreEvento=?, 
				faseActual=?, 
				fechaInicio=?, 
				cantidadTiempoExtra=?, 
				ganadorPartido=?',
				esPartidoEmpatado=?
				WHERE idEvento=?`;

			values = [
				query.nombreEvento || null,
				query.faseActual || null,
				query.fechaInicio || null,
				query.cantidadTiempoExtra || 0,
				query.ganadorPartido || null,
				query.esPartidoEmpatado ? 1 : 0,
				query.idEvento
			]
			break;
		case "equipo1":
			sql = `UPDATE evento SET 
				golesEquipo1=${query.golesEquipo1},
				tarjetasAmarilasEquipo1=${query.tarjetasAmarillasEquipo1}.
				tarjetasRojasEquipo1=${query.tarjetasRojasEquipo1},
				golesPenalesFinalesEquipo1=${query.golesPenalesFinalesEquipo1}
				WHERE idEvento=${query.idEvento}`
			break;
		case "equipo2":
			sql = `UPDATE evento SET 
				golesEquipo2=${query.golesEquipo2},
				tarjetasAmarilasEquipo2=${query.tarjetasAmarillasEquipo2}.
				tarjetasRojasEquipo2=${query.tarjetasRojasEquipo2},
				golesPenalesFinalesEquipo2=${query.golesPenalesFinalesEquipo2}
				WHERE idEvento=${query.idEvento}`
			break;
	}

	return new Promise((resolve, reject) => {
		conexion.query(sql, values, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	allEvento,
	getEventoPerCompeticion,
	addEvento,
	delEvento,
	updateEvento
}
