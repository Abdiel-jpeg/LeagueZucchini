const db  = require('../../src/DB/mysql.js');

const TABLA = 'animales';

const all = () => {
	return db.all(TABLA);
}

const add = (data) => {
	return db.add(TABLA, data);
}

const individual = (id) => {
	return db.individual(TABLA, id);
}

const del = (body) => {
	return db.del(TABLA, body);
}

module.exports = {
	all,
	individual,
	add,
	del,
}
