const mysql = require('mysql2');
const config = require('../config');

const dbconfig = {
	host: config.mysql.host,
	port: config.mysql.dbport,
	user: config.mysql.user,
	password: config.mysql.password,
	database: config.mysql.database,
}

let conexion;

const conMysql = () => {
	conexion = mysql.createConnection(dbconfig);
	conexion.connect((err) => {
		if(err) {
			console.log('[db err]', err);
			setTimeout(conMysql(), 200);
		} else {
			console.log('DB Conectada!!!');
		}
	});

	conexion.on('error', err => {	
		console.log('[db err]', err);
		if(err.code == 'PROTOCOL_CONNECTION_LOST') {
			conMysql();
		} else {
			throw err;
		}
	})
}

conMysql();

const all = (tabla) => {
	const sql = 'SELECT * FROM ' + tabla;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		});
	});
}

const individual = (tabla, id) => {
	const sql = 'SELECT * FROM ' + tabla + ' WHERE id = ' + id;
	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	});

}

const add = (tabla, body) => {
	const sql = 'INSERT INTO '+tabla+' (id, especie, estado) VALUES ('+body.id+', "'+body.especie+'", "'+body.estado+'")';
	
	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return (error) ? reject(error) : resolve(result);
		});
	})
}

const del = (tabla, body) => {
	const sql = 'DELETE FROM ' + tabla + ' WHERE id = ' + body.id;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {

		return error ? reject(error) : resolve(result);
		})
	})
}

const update = (tabla, body) => {
	const sql = 'UPDATE '+tabla+' SET especie="'+body.especie+'", estado="'+body.estado+'" WHERE id='+body.id;

	return new Promise((resolve, reject) => {
		conexion.query(sql, (error, result) => {
			return error ? reject(error) : resolve(result);
		})
	})
}

module.exports = {
	all,
	individual,
	add,
	del,
	update,
}
