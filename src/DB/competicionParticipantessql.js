const allCompeticionParticipantes = (conexion, idCompeticion) => {
	const sql =  `SELECT cp.idCompeticion,c.nombreCompeticion, c.nombreTipoCompeticion,cp.idEquipo,e.grado,e.grupo,e.nombreGrupo, e.nombreInstitucion FROM competicionParticipantes cp LEFT JOIN competicion c ON cp.idCompeticion = c.idCompeticion LEFT JOIN equipo e ON cp.idEquipo = e.idEquipo WHERE c.nombreCompeticion="${idCompeticion}";`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		}); 
	});
}

const addCompeticionParticipantes = (conexion, nombreCompeticion, idEquipo) => {
	const sql = ` INSERT INTO competicionParticipantes (idCompeticion, idEquipo) SELECT c.idCompeticion, ${idEquipo} FROM competicion c WHERE c.nombreCompeticion = "${nombreCompeticion}";
`;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		}); 
	});
}

const delCompeticionParticipantes = (conexion, nombreCompeticion, idEquipo) => {
	const sql =	`DELETE FROM competicionParticipantes WHERE idCompeticion = (SELECT idCompeticion FROM competicion WHERE nombreCompeticion = "${nombreCompeticion}") AND idEquipo = ${idEquipo};` 

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		}); 
	});
}

module.exports = {
	allCompeticionParticipantes,
	addCompeticionParticipantes,
	delCompeticionParticipantes
} 
