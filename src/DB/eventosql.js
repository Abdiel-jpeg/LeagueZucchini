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
		c.nombreCompeticion,
		(SELECT COUNT(*) FROM evento) AS count
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

const getEventoPerCompeticion = async (conexion, nombreCompeticion, limit, offset) => {
	const sqlId = 'SELECT idCompeticion FROM competicion WHERE nombreCompeticion = ? LIMIT 1';
	
	const valuesId = [nombreCompeticion]

	const queryId = () => {
		return new Promise((resolve, reject) => {
			conexion.query(sqlId, valuesId, (error, result) => {
				return error ? reject(error) : resolve(result);
			});
		});
	}

	response = await queryId();

	const { idCompeticion } = response[0]

	let sql

	if (limit == 0) {
		sql = `SELECT 
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
			e.idCompeticionEliminacionDirectaParticipante,
			e.idCompeticion, 
			c.nombreCompeticion, 
			c.nombreTipoCompeticion,
			(SELECT COUNT(*) FROM evento WHERE idCompeticion = ?) AS count
			FROM evento e 
			LEFT JOIN equipo f ON e.idEquipo1 = f.idEquipo 
			LEFT JOIN equipo g ON e.idEquipo2 = g.idEquipo 
			LEFT JOIN competicion c ON e.idCompeticion = c.idCompeticion 
			WHERE e.idCompeticion = ?;`;
	} else {
		sql = `SELECT 
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
			e.idCompeticionEliminacionDirectaParticipante,
			e.idCompeticion, 
			c.nombreCompeticion, 
			c.nombreTipoCompeticion,
			(SELECT COUNT(*) FROM evento WHERE idCompeticion = ?) AS count
			FROM evento e 
			LEFT JOIN equipo f ON e.idEquipo1 = f.idEquipo 
			LEFT JOIN equipo g ON e.idEquipo2 = g.idEquipo 
			LEFT JOIN competicion c ON e.idCompeticion = c.idCompeticion 
			WHERE e.idCompeticion = ?
			LIMIT ?
			OFFSET ?;`;
	}

	const values = [
		idCompeticion,
		idCompeticion,
		parseInt(limit),
		parseInt(offset)
	]

	return new Promise((resolve, reject) => {
		conexion.query(sql, values, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const addEvento = (conexion, nombreEvento, idCompeticionEliminacionDirectaParticipante, idEquipo1, idEquipo2, faseActual, nombreCompeticion) => {
	const sql = `INSERT INTO evento (
		nombreEvento, 
		idCompeticionEliminacionDirectaParticipante,
		idEquipo1, 
		idEquipo2, 
		faseActual, 
		idCompeticion
		) VALUES (?, ?, ?, ?, ?, (SELECT idCompeticion FROM competicion WHERE nombreCompeticion=? LIMIT 1))`;

	console.log(idEquipo1);
	console.log(idEquipo2)

	let values = [
		nombreEvento,
		idCompeticionEliminacionDirectaParticipante,
		idEquipo1 == 'null' ? null : idEquipo1,
		idEquipo2 == 'null' ? null : idEquipo2,
		faseActual,
		nombreCompeticion
	]

	return new Promise((resolve, reject) => {
		conexion.query(sql, values, (error, result) => {
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

	//------------------ Asignacion de Queries --------------

	const asignarQueries = (ganadorPartido, esPartidoEmpatado, puntosEquipo1, puntosEquipo2) => {
		switch(query.parte) {
			case "evento":
				sql = `UPDATE evento SET 
					nombreEvento=?, 
					fechaInicio=?, 
					cantidadTiempoExtra=?, 
					WHERE idEvento=?`;

				values = [
					query.nombreEvento || null,
					query.fechaInicio || null,
					query.cantidadTiempoExtra || 0,
					query.idEvento
				]
				break;
			case "equipos":
				sql = `UPDATE evento SET 
					golesEquipo1=?,
					tarjetasAmarillasEquipo1=?,
					tarjetasRojasEquipo1=?,
					golesPenalesFinalesEquipo1=?,
					golesEquipo2=?,
					tarjetasAmarillasEquipo2=?,
					tarjetasRojasEquipo2=?,
					golesPenalesFinalesEquipo2=?,
					ganadorPartido=?,
					esPartidoEmpatado=?,
					puntosEquipo1=?,
					puntosEquipo2=?
					WHERE idEvento=?`

				values = [
					parseInt(query.golesEquipo1),
					parseInt(query.tarjetasAmarillasEquipo1),
					parseInt(query.tarjetasRojasEquipo1),
					parseInt(query.golesPenalesFinalesEquipo1),
					parseInt(query.golesEquipo2),
					parseInt(query.tarjetasAmarillasEquipo2),
					parseInt(query.tarjetasRojasEquipo2),
					parseInt(query.golesPenalesFinalesEquipo2),
					ganadorPartido,
					esPartidoEmpatado,
					puntosEquipo1,
					puntosEquipo2,
					parseInt(query.idEvento)
				]

				break;
		}
	}

	//--------------------- Calculo de puntos ----------------
	
	const paraTablasPuntaje = () => {
		let puntosEquipo1 = query.golesEquipo1 > query.golesEquipo2 ? 3 : 0;
		let puntosEquipo2 = query.golesEquipo2 > query.golesEquipo1 ? 3 : 0;

		let ganadorPartido = puntosEquipo1 > puntosEquipo2 ? 'Equipo1' : "Equipo2";

		let esPartidoEmpatado = query.golesEquipo1 == query.golesEquipo2 ? 1 : 0;

		if (esPartidoEmpatado && query.nombreTipoCompeticion != 'Eliminación Directa') {
			puntosEquipo1 = 1;
			puntosEquipo2 = 1;
			ganadorPartido = 0;
		}

		asignarQueries(ganadorPartido, esPartidoEmpatado, puntosEquipo1, puntosEquipo2);
	}
	
	const paraArbolesBinarios = () => {
		let ganadorPartido;

		if(
			query.golesEquipo1 > query.golesEquipo2
			|| query.golesPenalesFinalesEquipo1 > query.golesPenalesFinalesEquipo2
		) {
			ganadorPartido = 'Equipo 1'	;
		}

		if(
			query.golesEquipo1 < query.golesEquipo2
			|| query.golesPenalesFinalesEquipo1 < query.golesPenalesFinalesEquipo2
		) {
			ganadorPartido = 'Equipo 2'
		}

		if(
			query.golesEquipo1 == query.golesEquipo2
			&& query.golesPenalesFinalesEquipo1 == query.golesPenalesFinalesEquipo2
		) {
			throw new Error('En eliminación directa no puede haber dos partidos con el mismo número de goles')
		}

		asignarQueries(ganadorPartido, null, null, null);

		actualizarArbol(conexion, ganadorPartido, query)
	}

	switch(query.nombreTipoCompeticion) {
		case "Eliminación Directa":
			paraArbolesBinarios();

			break;
		case "Regular. Ida y Vuelta":
		case "Regular. Todos contra Todos":
			paraTablasPuntaje();

			break;
	}

	console.log(sql);
	console.log(values);

	return new Promise((resolve, reject) => {
		conexion.query(sql, values, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

const actualizarArbol = async (conexion, ganador, query) => {
	//------------------ OBTENER ID COMPETICION ----------------
	const sqlIdCompeticion = `SELECT idCompeticion FROM evento WHERE idEvento = ? LIMIT 1`;

	let valuesIdCompeticion = [
		query.idEvento
	]

	const queryIdCompeticion = () => {
		return new Promise((resolve, reject) => {
			conexion.query(sqlIdCompeticion, valuesIdCompeticion, (error, result) => {
				error ? reject(error) : resolve(result);
			})
		})
	}

	const responseIdCompeticion = await queryIdCompeticion();

	const { idCompeticion } = responseIdCompeticion[0];

	//--- OBTENER ID COMPETICION ELIMINACION DIRECTA PARTICIPANTE ----

	const sqlIdParent = `SELECT idLinkTo FROM competicionEliminacionDirectaParticipante WHERE idCompeticion = ? AND idEquipo1 = ? AND idEquipo2 = ?`;

	let valuesIdParent = [
		idCompeticion,
		query.idEquipo1,
		query.idEquipo2
	]

	const queryIdParent = () => {
		return new Promise((resolve, reject) => {
			conexion.query(sqlIdParent, valuesIdParent, (error, result) => {
				error ? reject(error) : resolve(result);
			})
		})
	}

	const responseIdParent = await queryIdParent();

	const { idLinkTo: idParent } = responseIdParent[0];

	//--------------- ENCONTRAR	EQUIPO FALTANTE ---------------------
	
	const sqlEquipoFaltante = `SELECT idEquipo1, idEquipo2 FROM competicionEliminacionDirectaParticipante WHERE idCompeticionEliminacionDirectaParticipante = ?`;

	const valuesEquipoFaltante = [
		idParent
	]

	const queryEquipoFaltante = () => {
		return new Promise((resolve, reject) => {
			conexion.query(sqlEquipoFaltante, valuesEquipoFaltante, (error, result) => {
				error ? reject(error) : resolve(result);
			})
		})
	}

	const responseEquipoFaltante = await queryEquipoFaltante();

	if(idParent != null) {
		const { idEquipo1: equipoFaltante1, idEquipo2: equipoFaltante2 } = responseEquipoFaltante[0];
	} else {
		return
	}

	//------------------- ASIGNAR GANADOR -----------------------
	
	let idGanador = ganador == 'Equipo 1' ? query.idEquipo1 : query.idEquipo2;

	let sqlGanador;
	
	//Si idEquipo2 está faltante, remplazarlo. En caso contrario siempre remplazar al equipo 2
	
	if(equipoFaltante1 == null) {
		sqlGanador = `UPDATE competicionEliminacionDirectaParticipante SET idEquipo1 = ? WHERE idCompeticion = ? AND idCompeticionEliminacionDirectaParticipante = ?`;
	} else if(equipoFaltante2 == null) {
		sqlGanador = `UPDATE competicionEliminacionDirectaParticipante SET idEquipo2 = ? WHERE idCompeticion = ? AND idCompeticionEliminacionDirectaParticipante = ?`;
	}

	if(equipoFaltante1 != null && equipoFaltante2 != null) {
		//throw new Error('No puedes modificar la información de las competiciones. Requiere intervencion manual')

		return;
	}

	let valuesGanador = [
		idGanador,
		idCompeticion,
		idParent
	]

	const queryGanador = () => {
		return new Promise((resolve, reject) => {
			conexion.query(sqlGanador, valuesGanador, (error, result) => {
				error ? reject(error) : resolve(result)
			})
		})
	}

	const responseGanador = await queryGanador();

	//------------------ ACTUALIZAR EVENTOS ----------------------
	
	let nombreEvento = ''
	let sqlEvento;

	if(equipoFaltante1 == null) {
		nombreEvento = `${idGanador} vs ${equipoFaltante2}`
	}

	if(equipoFaltante2 == null) {
		nombreEvento = `${equipoFaltante1} vs ${idGanador}`
	}

	if (equipoFaltante2 == null && equipoFaltante1 == null) {
		nombreEvento ='';
	}

	if(equipoFaltante1 != null && equipoFaltante2 != null) {
		nombreEvento = `${equipoFaltante1} vs ${equipoFaltante2}`
	}
	
	if(equipoFaltante1 == null) {
		sqlEvento = `UPDATE evento SET nombreEvento = ?, idEquipo1 = ? WHERE idCompeticion = ? AND idCompeticionEliminacionDirectaParticipante = ?`;
	} else if(equipoFaltante2 == null) {
		sqlEvento = `UPDATE evento SET nombreEvento = ?, idEquipo2 = ? WHERE idCompeticion = ? AND idCompeticionEliminacionDirectaParticipante = ?`;
	}

	const valuesEvento = [
		nombreEvento,
		idGanador,
		idCompeticion,
		idParent + 1
	]
	
	const queryEvento = () => {
		return new Promise((resolve, reject) => {
			conexion.query(sqlEvento, valuesEvento, (error, result) => {
				error ? reject(error) : resolve(result)
			})
		})
	}

	const responseEvento = await queryEvento();

	console.log(responseGanador);
	console.log(responseEvento)
}

module.exports = {
	allEvento,
	getEventoPerCompeticion,
	addEvento,
	delEvento,
	updateEvento
}
